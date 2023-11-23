import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import { useMemo } from 'react';

const Map = () => {
    const libraries = useMemo(() => ['places'], []);
    const mapCenter = useMemo(
        () => ({ lat: 41.1973179, lng: -73.8885881 }),
        []
    );

    const mapOptions = useMemo(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
            zoomControl: true,
            mapTypeControl: true,
        }),[]
    );

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
        libraries: libraries,
    });

    if (!isLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div>
                <p>This is Sidebar...</p>
            </div>
            <GoogleMap
                options={mapOptions}
                zoom={13}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '800px', height: '600px' }}
                onLoad={() => console.log('Map Component Loaded...')}
            />
        </div>
    );
};

export default Map;