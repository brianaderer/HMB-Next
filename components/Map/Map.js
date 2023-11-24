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

const Map = () => {
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 12;

    return (
        <Wrapper apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY} render={render}>
            <MapComponent center={center} zoom={zoom} />
        </Wrapper>
    );
}

export default Map;