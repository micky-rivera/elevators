const convertToYValue = (inputFloor) => {
    let result;
    
    const correspondingYValue = (21 - inputFloor) * 25;
    const distanceFromBottom = inputFloor - 1;
    const distanceFromTop = 20 - inputFloor;

    if (distanceFromBottom > distanceFromTop) {
        const difference = distanceFromBottom - distanceFromTop;
        result = correspondingYValue + (difference * 25);
    } else {
        const difference = distanceFromTop - distanceFromBottom;
        result = correspondingYValue - (difference * 25);
    }
    
    return result;
}

export default convertToYValue;
