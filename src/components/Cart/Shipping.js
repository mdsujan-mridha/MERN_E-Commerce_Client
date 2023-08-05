import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../../actions/cartAction';
import { Fragment } from 'react';
import MetaData from '../Layout/MetaData/MetaData';
import { Home, LocationCity, Phone, PinDrop, Public, TransferWithinAStation } from '@mui/icons-material';
import { Country, State } from "country-state-city";
import "./shipping.css";
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const dispatch = useDispatch();
    const { ShippingInfo } = useSelector((state) => state?.cart);
    // console.log(ShippingInfo);
    const [address, setAddress] = useState(ShippingInfo?.address);
    const [city, setCity] = useState(ShippingInfo?.city);
    const [state, setState] = useState(ShippingInfo?.state);
    const [country, setCountry] = useState(ShippingInfo?.country);
    const [pinCode, setPinCode] = useState(ShippingInfo?.pinCode);
    const [phoneNumber, setPhoneNumber] = useState(ShippingInfo?.phoneNumber);
    const navigate = useNavigate();

    const shippingSubmit = (e) => {
        e.preventDefault();
        if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            toast.warn("Phone number must be 10 digit");
            return;

        }
        dispatch(
            saveShippingInfo({ address, city, state, country, pinCode, phoneNumber })
        );
        navigate("/order/confirm")
    }
    return (
        <Fragment>
            <MetaData title="Shipping Details" />
            <CheckoutSteps activeStep={0} />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">  Shipping Details </h2>
                    <form
                        className='shippingForm'
                        onSubmit={shippingSubmit}
                        encType="multipart/form-data"
                    >
                        <div>
                            <Home />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCity />
                            <input
                                type="text"
                                placeholder="City"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <PinDrop />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <Phone />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                size="10"
                            />
                        </div>
                        <div>
                            <Public />

                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {country && (
                            <div>
                                <TransferWithinAStation />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default Shipping;