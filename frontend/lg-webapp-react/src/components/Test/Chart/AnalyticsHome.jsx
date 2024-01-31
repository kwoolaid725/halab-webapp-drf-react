// App.js
import React, {useEffect, useState} from 'react';
import BoxPlotChart from "./BoxPlotChart";
import axiosInstance from "../../../axios";

const AnalyticsHome = (props) => {
    const [testIds, setTestIds] = useState([]);
    const [testCategory, setTestCategory] = useState('CR');
    const [productCategory, setProductCategory] = useState('STICK VACUUMS (CORDLESS)');
    // const [productCategory, setProductCategory] = useState('ROBOT VACUUMS');
    const [productCategoryId, setProductCategoryId] = useState(null);
    const [testMeasures, setTestMeasures] = useState([]);
    const [testData, setTestData] = useState([]);
    const [targetKeys, setTargetKeys] = useState([]);
    const [groupKeys, setGroupKeys] = useState([]);
    const [measureKeys, setMeasureKeys] = useState([]);

    useEffect(() => {
        axiosInstance(`/categories/?name=${productCategory}`)
            .then(response => {
                const fetchedCategoryId = response.data[0]?.id; // Assuming the API returns an array
                setProductCategoryId(fetchedCategoryId);
            })
            .catch(error => {
                console.error('Error fetching category ID:', error);
            });
    }, [productCategory]);


    useEffect(() => {
        axiosInstance(`/tests/?test_category=${testCategory}&product_category=${productCategoryId}`)
            .then((res) => {
                const fetchedRows = res.data || [];
                const fetchedTestIds = fetchedRows.map(row => row.id);

                setTestIds(fetchedTestIds);
            })
            .catch((error) => {
                console.error('Error fetching detailed data: ', error);
            });

    }, [testCategory, productCategoryId]);

    useEffect(() => {
        if (testIds.length > 0) {
            const testIdsParam = testIds.join('&test=');
            axiosInstance(`/tests/testdetails/?test=${testIdsParam}`)
                .then((res) => {
                    const fetchedRows = res.data || [];
                    console.log('testIdsParam', testIdsParam);
                    setTestData(fetchedRows);

                })
                .catch((error) => {
                    console.error('Error fetching detailed data: ', error);
                });
        }
    }, [testIds]);


    console.log('testData', testData);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let lowerCaseProductCategory = productCategory.toLowerCase();

                if (lowerCaseProductCategory.includes("cordless")) {
                    lowerCaseProductCategory = "cordless";
                }

                if (lowerCaseProductCategory.includes("robot")) {
                    lowerCaseProductCategory = "robot";
                }

                const response = await fetch(`/test-measures-${lowerCaseProductCategory}.json`);
                const jsonData = await response.json();
                const testMeasuresCategory = jsonData[testCategory];

                // Set testMeasures as a whole object
                setTestMeasures(testMeasuresCategory);

            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [testCategory]);


  const flattenData = (data) => {
      // Group data by model, sample, and brush_type
      const groupedData = data.reduce((acc, row) => {
        const { model, brush_type, sample, test_target, test_group, test_measure, value } = row;

        // Create a unique key for each combination of model, sample, and brush_type
        const key = `${model}-${sample}-${brush_type}`;

        // Initialize an array for each unique key if it doesn't exist
        acc[key] = acc[key] || [];

        // Create an array of grouping keys dynamically
        const groupingKeys = [test_target, test_group, test_measure];

        // Create a nested structure based on the array of grouping keys
        let currentLevel = acc[key];
        groupingKeys.forEach((groupingKey) => {
          currentLevel[groupingKey] = currentLevel[groupingKey] || [];
          currentLevel = currentLevel[groupingKey];
        });

        // Push the row to the innermost array
        currentLevel.push({
          model,
          sample,
          brush_type,
          test_target,
          test_group,
          test_measure,
          value,
          units: row.units,
        });

        return acc;
      }, {});

      return groupedData;
    };

    const groupedData = flattenData(testData);

    // console.log('groupedData', groupedData);



    // console.log('targetKeys', targetKeys);
    // console.log('measureKeys', measureKeys);
    //
    // console.log('testIds', testIds);
    // console.log('productCategoryId', productCategoryId);
    // console.log('testMeasures', testMeasures);
    //
    //

    // x-axis: model
    // select test_target, test_group, test_measure,
    // y-axis: value (test_measure)
    ;
   return (
  <div className="App">
    analytics home
    <main>
      {testMeasures && typeof testMeasures === 'object' && (
        <>
          {/*<pre>{JSON.stringify(groupedData, null, 2)}</pre>*/}
          {/* Render a BoxPlotChart for each testMeasure */}
          {Object.keys(testMeasures).map((testMeasure) => (
            <div key={testMeasure}>
              <h2>{testMeasure}</h2>
              {/* Pass relevant data to BoxPlotChart */}
              <BoxPlotChart
                  data={groupedData}
                  testMeasure={testMeasure} />
            </div>
          ))}

        </>
      )}
    </main>
  </div>
);
}

export default AnalyticsHome;
