const Distance = (distance) => {
    const {foot, bike, car} = distance.distance;
    return (
        <div className={'mb-4'}>
            {foot.distance.value < 8000 &&
                <p>Walk: {foot.duration.text}, {foot.distance.text}</p>
            }
            <p>Drive: {car.duration.text}, {car.distance.text}</p>
            {bike.distance.value < 25000 &&
                <p>Bike: {bike.duration.text}, {bike.distance.text}</p>
            }
        </div>
    )
}

export default Distance;