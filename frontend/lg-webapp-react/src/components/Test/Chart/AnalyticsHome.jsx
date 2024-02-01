import React, {
  useEffect,
  useState
} from 'react'
import BoxPlotChart from './BoxPlotChart'
import axiosInstance from '../../../axios'

const AnalyticsHome = (props) => {
  const [testIds, setTestIds] = useState([])
  const [testCategory, setTestCategory] = useState('CR')
  const [productCategory, setProductCategory] = useState('STICK VACUUMS (CORDLESS)')
  const [productCategoryId, setProductCategoryId] = useState(null)
  const [testMeasures, setTestMeasures] = useState([])
  const [testData, setTestData] = useState([])
  const [uniqueSelections, setUniqueSelections] = useState([])
  const [selectedModel, setSelectedModel] = useState(null)
  const [selectedBrushType, setSelectedBrushType] = useState(null)
  const [selectedSample, setSelectedSample] = useState(null)
  const [uniqueTestTargets, setUniqueTestTargets] = useState([])
  const [uniqueTestMeasures, setUniqueTestMeasures] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [selectedMeasure, setSelectedMeasure] = useState(null)

  const [selectedModels, setSelectedModels] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let lowerCaseProductCategory = productCategory.toLowerCase()

        if (lowerCaseProductCategory.includes('cordless')) {
          lowerCaseProductCategory = 'cordless'
        }

        if (lowerCaseProductCategory.includes('robot')) {
          lowerCaseProductCategory = 'robot'
        }

        const response = await fetch(`/test-measures-${lowerCaseProductCategory}.json`)
        const jsonData = await response.json()
        const testMeasuresCategory = jsonData[testCategory]

        setTestMeasures(testMeasuresCategory)

        // Extract unique test targets and measures
        const targets = Object.keys(testMeasuresCategory)
        const measures = targets.flatMap(target => Object.keys(testMeasuresCategory[target]))

        setUniqueTestTargets([...new Set(targets)])
        setUniqueTestMeasures([...new Set(measures)])
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [productCategory])

  console.log('testMeasures:', testMeasures)

  // Handle changes in Category selection
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
    setSelectedSubCategory(null) // Reset sub-category on category change
  }

  // Handle changes in Sub-Category selection
  const handleSubCategoryChange = (event) => {
    setSelectedSubCategory(event.target.value)
    setSelectedMeasure(null) // Reset measure on sub-category change
  }

  // Handle changes in Measure selection
  const handleMeasureChange = (event) => {
    setSelectedMeasure(event.target.value)
  }

  useEffect(() => {
    axiosInstance(`/categories/?name=${productCategory}`)
      .then((response) => {
        const fetchedCategoryId = response.data[0]?.id // Assuming the API returns an array
        setProductCategoryId(fetchedCategoryId)
      })
      .catch((error) => {
        console.error('Error fetching category ID:', error)
      })
  }, [productCategory])

  useEffect(() => {
    axiosInstance(`/tests/?test_category=${testCategory}&product_category=${productCategoryId}`)
      .then((res) => {
        const fetchedRows = res.data || []
        const fetchedTestIds = fetchedRows.map((row) => row.id)

        setTestIds(fetchedTestIds)
      })
      .catch((error) => {
        console.error('Error fetching detailed data: ', error)
      })
  }, [
    testCategory,
    productCategoryId
  ])

  useEffect(() => {
    if (testIds.length > 0) {
      const testIdsParam = testIds.join('&test=')
      axiosInstance(`/tests/testdetails/?test=${testIdsParam}`)
        .then((res) => {
          const fetchedRows = res.data || []
          setTestData(fetchedRows)
        })
        .catch((error) => {
          console.error('Error fetching detailed data: ', error)
        })
    }
  }, [testIds])

  console.log('testData:', testData)

  useEffect(() => {
    if (testData && testData.length > 0) {
      const uniqueModels = [...new Set(testData.map((item) => item.model))]
      const uniqueBrushTypes = [...new Set(testData.map((item) => item.brush_type))]
      const uniqueSamples = [...new Set(testData.map((item) => item.sample))]

      setUniqueSelections({
        models: uniqueModels,
        brushTypes: uniqueBrushTypes,
        samples: uniqueSamples,
      })
    }
  }, [testData])

  const handleModelChange = (event) => {
    const selectedModel = event.target.value

    // Toggle the selection of the model
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(selectedModel)) {
        // If the model is already selected, remove it
        return prevSelectedModels.filter((model) => model !== selectedModel)
      } else {
        // If the model is not selected, add it
        return [
          ...prevSelectedModels,
          selectedModel
        ]
      }
    })

    // Toggle the selection of the model
    setSelectedModels((prevSelectedModels) => {
      if (prevSelectedModels.includes(selectedModel)) {
        // If the model is already selected, remove it
        return prevSelectedModels.filter((model) => model !== selectedModel)
      } else {
        // If the model is not selected, add it
        return [
          ...prevSelectedModels,
          selectedModel
        ]
      }
    })

    // Filter unique samples and brush types based on the selected model
    const filteredSamples = testData
      .filter((item) => item.model === event.target.value)
      .map((item) => item.sample)

    const filteredBrushTypes = testData
      .filter((item) => item.model === event.target.value)
      .map((item) => item.brush_type)

    // Update the state with the filtered samples and brush types
    setUniqueSelections((prevSelections) => ({
      ...prevSelections,
      samples: [...new Set(filteredSamples)],
      brushTypes: [...new Set(filteredBrushTypes)],
    }))
  }

  const handleBrushTypeChange = (event) => {
    setSelectedBrushType(event.target.value)
  }

  const handleSampleChange = (event) => {
    setSelectedSample(event.target.value)
  }

  const generateSelectionPanel = (label, options, onChangeHandler) => (
    <div>
      <label>{`Select ${label}:`}</label>
      <select onChange={onChangeHandler}>
        <option value="">All {label}</option>
        {options && options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )

  const groupedData = testData.reduce((groups, item) => {
    let key
    const subgroupKey = item.test_measure
    key = `${item.test}-${item.test_case}-${item.test_target}-${item.test_group}-${item.model}-${item.sample}-${item.brush_type}`

    if (!groups[key]) {
      groups[key] = {
        group: key,
      }
    }

    if (subgroupKey.includes('Pickup')) {
      if (!groups[key][subgroupKey]) {
        groups[key][subgroupKey] = {
          mu: 0,
          sd: 0,
          n: 0,
          values: [],
          testId: item.test,
          testCase: item.test_case,
          testTarget: item.test_target,
          testGroup: item.test_group,
          model: item.model,
          sample: item.sample,
          brushType: item.brush_type,
        }
      }

      const subgroup = groups[key][subgroupKey]

      if (!subgroup.values.includes(item.value)) {
        subgroup.values.push(item.value)
        subgroup.n += 1
        const delta = item.value - subgroup.mu
        subgroup.mu += delta / subgroup.n
        const delta2 = item.value - subgroup.mu
        subgroup.sd += delta * delta2
      }
    }

    return groups
  }, {})

  console.log(Object.values(groupedData))

  const filterChartData = () => {
    const filteredData = Object.values(groupedData).flatMap((group) => {
      return Object.keys(group)
        .filter((key) => key !== 'group')
        .flatMap((subgroupKey) => {
          const subgroup = group[subgroupKey]

          return subgroup.values.map((value) => ({
            group: group.group,
            subgroup: subgroupKey,
            mu: subgroup.mu,
            sd: subgroup.sd,
            value: value,
            testId: subgroup.testId,
            testCase: subgroup.testCase,
            testTarget: subgroup.testTarget,
            testGroup: subgroup.testGroup,
            model: subgroup.model,
            sample: subgroup.sample,
            brushType: subgroup.brushType,
          }))
        })
    }).filter((item) => (
      (!selectedModels.length || selectedModels.includes(item.model)) &&
      (!selectedBrushType || item.brushType === selectedBrushType) &&
      (!selectedSample || item.sample === selectedSample)
    ))

    // Render your BoxPlotChart based on filtered data
    return <BoxPlotChart data={filteredData}/>

  }
  //
  // const transformedData = Object.values(groupedData).flatMap((group) => {
  //     return Object.keys(group)
  //         .filter((key) => key !== 'group')
  //         .flatMap((subgroupKey) => {
  //             const subgroup = group[subgroupKey];
  //             let dynamicKey = 'group';
  //
  //             return subgroup.values.map((value) => ({
  //                 group: group.group,
  //                 subgroup: subgroupKey,
  //                 mu: subgroup.mu,
  //                 sd: subgroup.sd,
  //                 value: value,
  //                 testId: subgroup.testId,
  //                 testCase: subgroup.testCase,
  //                 testTarget: subgroup.testTarget,
  //                 testGroup: subgroup.testGroup,
  //                 model: subgroup.model,
  //                 sample: subgroup.sample,
  //                 brushType: subgroup.brushType,
  //             }));
  //         });
  // });
  //
  // console.log(transformedData);

  // const uniqueTestIds = [...new Set(transformedData.map((item) => item.testId))];
  //
  // const separateDataSets = uniqueTestIds.map((testId) => {
  //     const testDataForTestId = transformedData.filter((item) => item.testId === testId);
  //     const uniqueTestTargets = [...new Set(testDataForTestId.map((item) => item.testTarget))];
  //
  //     const separateDataSetsForTestTarget = uniqueTestTargets.map((testTarget) => {
  //         const testDataForTestTarget = testDataForTestId.filter((item) => item.testTarget === testTarget);
  //         const uniqueTestGroups = [...new Set(testDataForTestTarget.map((item) => item.testGroup))];
  //
  //         const separateDataSetsForTestGroup = uniqueTestGroups.map((testGroup) => {
  //             return testDataForTestTarget.filter((item) => item.testGroup === testGroup);
  //         });
  //
  //         return {
  //             testTarget,
  //             datasets: separateDataSetsForTestGroup,
  //         };
  //     });
  //
  //     return {
  //         testId,
  //         datasets: separateDataSetsForTestTarget,
  //     };
  // });

  //  const filteredDataSets = separateDataSets.map((testData) => {
  //     const filteredTestTargets = testData.datasets.map((testTargetData) => {
  //         const filteredTestGroups = testTargetData.datasets.map((dataSet) => {
  //             const filteredData = dataSet.filter((item) => {
  //                 return (
  //                     (!selectedModel || item.model === selectedModel) &&
  //                     (!selectedBrushType || item.brushType === selectedBrushType) &&
  //                     (!selectedSample || item.sample === selectedSample)
  //                 );
  //             });
  //
  //             return {
  //                 ...dataSet,
  //                 data: filteredData,
  //             };
  //         });
  //
  //         return {
  //             ...testTargetData,
  //             datasets: filteredTestGroups,
  //         };
  //     });
  //
  //     return {
  //         ...testData,
  //         datasets: filteredTestTargets,
  //     };
  // });

  // const filterChartData = () => {
  //     const filteredData = transformedData.filter((item) => (
  //         (!selectedModel || item.model === selectedModel) &&
  //         (!selectedBrushType || item.brushType === selectedBrushType) &&
  //         (!selectedSample || item.sample === selectedSample)
  //     ));
  //
  //     return <BoxPlotChart data={filteredData}/>;
  // };
  //
  //
  // const boxPlotCharts = filteredDataSets.map((testData, index) => (
  //     <div key={index}>
  //         <h3>{`Test ID: ${testData.testId}`}</h3>
  //         {testData.datasets.map((testTargetData, subIndex) => (
  //             <div key={subIndex}>
  //                 <h4>{`Test Target: ${testTargetData.testTarget}`}</h4>
  //                 {testTargetData.datasets.map((dataSet, innerIndex) => (
  //                     <BoxPlotChart key={innerIndex} data={dataSet.data}/>
  //                 ))}
  //             </div>
  //         ))}
  //     </div>
  // ));



  return (

    <>
      <div>
        <label>Select Category:</label>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">Select Category</option>
          {Object.keys(testMeasures).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {testMeasures && selectedCategory && (
        <div>
          <label>Select Sub-Category:</label>
          <select onChange={handleSubCategoryChange} value={selectedSubCategory}>
            <option value="">Select Sub-Category</option>

            {/* Check if testMeasures[selectedCategory] is defined and not null */}
            {testMeasures[selectedCategory] !== undefined && testMeasures[selectedCategory] !== null && (
              Array.isArray(testMeasures[selectedCategory])
              ? (
                testMeasures[selectedCategory].map((subCategoryObject, index) => (
                  <option key={index} value={Object.keys(subCategoryObject)[0]}>
                    {Object.keys(subCategoryObject)[0]}
                  </option>
                ))
              )
              : (
                Object.keys(testMeasures[selectedCategory]).map((subCategory) => (
                  <option key={subCategory} value={subCategory}>
                    {subCategory}
                  </option>
                ))
              )
            )}
          </select>
        </div>
      )}


      {selectedCategory && selectedSubCategory && (
        <div>
          <label>Select Measure:</label>
          <select onChange={handleMeasureChange} value={selectedMeasure}>
            {Array.isArray(testMeasures[selectedCategory]) ? (
              // Handle "Bare" as an array
              testMeasures[selectedCategory].map((subcategoryObject, index) => {
                if (selectedSubCategory in subcategoryObject) {
                  const subcategory = subcategoryObject[selectedSubCategory][0]
                  return Object.keys(subcategory).map((measure) => (
                    <option key={measure} value={measure}>
                      {measure}
                    </option>
                  ))
                } else {
                  return null
                }
              })
            ) : (
               // Handle "Carpet" and "Edge" as objects
               selectedSubCategory in testMeasures[selectedCategory] &&
               Object.keys(testMeasures[selectedCategory][selectedSubCategory]).map((measure) => (
                 <option key={measure} value={measure}>
                   {measure}
                 </option>
               ))
             )}
          </select>
        </div>
      )}


      {/*<div>*/}
      {/*  {generateSelectionPanel('Model', uniqueSelections.models, handleModelChange)}*/}

      <div>
        <label>Select Models:</label>
        <select multiple onChange={handleModelChange} value={selectedModels}>
          {uniqueSelections && uniqueSelections.models && uniqueSelections.models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Brush Type:</label>
        <select onChange={handleBrushTypeChange} value={selectedBrushType}>
          <option value="">All Brush Types</option>
          {uniqueSelections && uniqueSelections.brushTypes && uniqueSelections.brushTypes.map((brushType) => (
            <option key={brushType} value={brushType}>
              {brushType}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Sample:</label>
        <select onChange={handleSampleChange} value={selectedSample}>
          <option value="">All Samples</option>
          {uniqueSelections && uniqueSelections.samples && uniqueSelections.samples.map((sample) => (
            <option key={sample} value={sample}>
              {sample}
            </option>
          ))}
        </select>
      </div>

      <button onClick={filterChartData}>Apply Filters</button>

      {/* Render your BoxPlotChart based on filtered data */}
      {selectedModel && selectedBrushType && selectedSample && filterChartData()}
      {/*</div>*/}
    </>
  )
}

export default AnalyticsHome
