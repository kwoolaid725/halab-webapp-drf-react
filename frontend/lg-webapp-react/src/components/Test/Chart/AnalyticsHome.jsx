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

    const [selectedTestMeasure, setSelectedTestMeasure] = useState(null);

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


  // Assuming data is an array of objects like the one you provided

  const groupedData = testData.reduce((groups, item) => {
  const key = `${item.test}-${item.test_case}-${item.test_target}-${item.test_group}-${item.model}-${item.sample}-${item.brush_type}`;
  const subgroupKey = item.test_measure;

  if (!groups[key]) {
    groups[key] = {
      group: key,
    };
  }

  // Filter based on test_measure containing 'Pickup'
  if (subgroupKey.includes('Pickup')) {
    // Check if the subgroup key exists
    if (!groups[key][subgroupKey]) {
      groups[key][subgroupKey] = {
        mu: 0,
        sd: 0,
        n: 0,
        values: [],
      };
    }

    const subgroup = groups[key][subgroupKey];

    // Check for duplicate values before adding them
    if (!subgroup.values.includes(item.value)) {
      subgroup.values.push(item.value);
      subgroup.n += 1; // Increment the count

      // Calculate running mean and standard deviation (Welford's method)
      const delta = item.value - subgroup.mu;
      subgroup.mu += delta / subgroup.n;
      const delta2 = item.value - subgroup.mu;
      subgroup.sd += delta * delta2;
    }
  }

  return groups;
}, {});

// The groupedData object now contains the desired format
console.log(Object.values(groupedData));

const transformedData = Object.values(groupedData).flatMap((group) => {
  return Object.keys(group)
    .filter((key) => key !== 'group')
    .flatMap((subgroupKey) => {
      const subgroup = group[subgroupKey];
      return subgroup.values.map((value) => ({
        group: group.group,
        subgroup: subgroupKey,
        mu: subgroup.mu,
        sd: subgroup.sd,
        value: value,
      }));
    });
});

console.log(transformedData);


    // x-axis: model
    // select test_target, test_group, test_measure,
    // y-axis: value (test_measure)
    ;
   return (
  <div className="App">
    analytics home
    <main>
        {/*{testMeasures && typeof testMeasures === 'object' && (*/}
        {/*  <>*/}
        {/*    <select onChange={(e) => setSelectedTestMeasure(e.target.value)}>*/}
        {/*      {Object.keys(testMeasures).map((testMeasure) => (*/}
        {/*        <option key={testMeasure} value={testMeasure}>*/}
        {/*          {testMeasure}*/}
        {/*        </option>*/}
        {/*      ))}*/}
        {/*    </select>*/}

        {/*    {selectedTestMeasure && (*/}
        {/*      <BoxPlotChart*/}
        {/*        groupedData={groupedData}*/}
        {/*        // selectedTestMeasure={selectedTestMeasure}*/}
        {/*      />*/}
        {/*    )}*/}
        {/*  </>*/}
        {/*)}*/}
      <BoxPlotChart
        data={transformedData}
        />
    </main>
  </div>
);
}

export default AnalyticsHome;
