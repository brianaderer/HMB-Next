/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";
import {
    Loading,
    Error
} from "../index";

const render = (status)=> {
    if (status === Status.LOADING) return <Loading />;
    if (status === Status.FAILURE) return <Error />;
    return null;
};

const Map = props => {
    const {locations} = props;
    const center = { lat: 41.1973179, lng: -73.8885881 };
    const zoom = 9;

    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} render={render} libraries={['marker']}>
            <MapComponent center={center} zoom={zoom} locationData={locations} />
        </Wrapper>
    );
}

export default Map;