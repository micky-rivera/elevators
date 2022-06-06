const convertToYValue = (inputFloor) => {
    const convertions = [
        [20, 25],
        [19, 50],
        [18, 75],
        [17, 100],
        [16, 125],
        [15, 150],
        [14, 175],
        [13, 200],
        [12, 225],
        [11, 250],
        [10, 275],
        [9, 300],
        [8, 325],
        [7, 350],
        [6, 375],
        [5, 400],
        [4, 425],
        [3, 450],
        [2, 475],
        [1, 500]
    ];
    const result = convertions.filter(floor => floor[0] === inputFloor)[0];
    return result[1];
}

export default convertToYValue;
