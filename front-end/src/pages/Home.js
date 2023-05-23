import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../redux/property/propertySlice";


const Home = () => {
    const { properties } = useSelector((store) => store.propertyHandler);
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getProperties());
    }, []);

    React.useEffect(() => {
        console.log("propertiesproperties", properties);
    }, [properties])



    return (
        <>
            <h1>Hello From</h1>
            <h2>Talk To Broker</h2>
        </>
    );
};

export default Home;
