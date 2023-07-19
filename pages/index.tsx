import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, gql } from '@apollo/client';
import Plot from 'react-plotly.js';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

const GET_DATA = gql`
  query {
    fetchData
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error occurred while fetching data.</div>;

  const parsedData = JSON.parse(data.fetchData);



  return (
    <div>
      {
        const socialGroupData = parsedData.result.records.filter(
            (record) =>
              record.state_name === 'Uttar Pradesh' ||
              record.state_name === 'Madhya Pradesh' ||
              record.state_name === 'Punjab' ||
              record.state_name === 'Andhra Pradesh' ||
              record.state_name === 'Telangana'
          );
          
          const socialGroupLabels = socialGroupData.map((record) => record.state_name);
          const socialGroupValues = socialGroupData.map((record) => record.hol_no);
          
          const chartData = [
            {
              x: socialGroupLabels,
              y: socialGroupValues,
              type: 'bar',
            },
          ];
          
          const chartLayout = {
            title: 'Total Number of Holdings by Social Group',
            xaxis: {
              title: 'State',
            },
            yaxis: {
              title: 'Total Number of Holdings',
            },
          };
          
          <Plot data={chartData} layout={chartLayout} />;


          const districtData = parsedData.result.records.filter(
            (record) => record.hol_ar !== undefined && record.hol_ar !== ''
          );
          
          const districtCodes = districtData.map((record) => record.district_code);
          const districtValues = districtData.map((record) => parseFloat(record.hol_ar));
          
          const chartData = [
            {
              type: 'choropleth',
              locationmode: '\india_districts.geojson',
              locations: districtCodes,
              z: districtValues,
              geojson: 'file.json',
              zmin: Math.min(...districtValues),
              zmax: Math.max(...districtValues),
              colorscale: 'YlOrRd',
            },
          ];
          
          const chartLayout = {
            title: 'Total Holding Area by District',
            geo: {
              scope: 'india',
            },
          };
          
          <Plot data={chartData} layout={chartLayout} />;
          
          
      }
    </div>
  );
}

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
