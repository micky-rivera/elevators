const convertToYValue = (inputFloor) => {
    let result;
    
    const distanceFromBottom = inputFloor - 1;
    const distanceFromTop = 20 - inputFloor;

    if (distanceFromBottom > distanceFromTop) {
        result = 25 + (distanceFromTop * 25);
    } else {
        result = 500 - (distanceFromBottom * 25);
    }
    return result;
}

export default convertToYValue;
