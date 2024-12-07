const Distance = (distance) => {
    const {foot, bike, car} = distance.distance;
    return (
        <div className={'mb-4'}>
            <p>Drive: {car.duration.text}, {car.distance.text}</p>
            <p>Walk: {foot.duration.text}, {foot.distance.text}</p>
            <p>Bike: {bike.duration.text}, {bike.distance.text}</p>
        </div>
    )
}

export default Distance;