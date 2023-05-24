import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../redux/property/propertySlice';
import PropertyCard from '../components/property/PropertyCard';

const Home = () => {
  const { properties } = useSelector((store) => store.propertyHandler);
  const [propertyArray, setPropertyArray] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getProperties());
  }, []);

  React.useEffect(() => {
    console.log('propertiesproperties', properties);
    const { status, data } = properties;
    status === "OK" && setPropertyArray(data);
  }, [properties]);

  console.log("propertyArray",propertyArray);
  return (
    <>
   
      <h1>Hello From</h1>
      <h2>Talk To Broker</h2>

      {propertyArray && propertyArray.length > 0 && propertyArray.map((property) => {
        return <PropertyCard propertyDetails={property}/>
    })}
    </>
  );
};

export default Home;
