
var rowMap = [];
var colMap = [];
var boxMap = [];

function solve(matrix) {

    rowMap = [];
    colMap = [];
    boxMap = [];
    for (var i = 0; i < 9; i++) {
        var obj1 = {};
        var obj2 = {};
        var obj3 = {};
        rowMap.push(obj1);
        colMap.push(obj2);
        boxMap.push(obj3);
    }
    for (let i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (matrix[i][j] !== 0) {
                rowMap[i][matrix[i][j]] = 1;
                colMap[j][matrix[i][j]] = 1;
                boxMap[boxLocation(i, j) - 1][matrix[i][j]] = 1;
            }
        }
    }
    // console.log(rowMap);
    // console.log(colMap);
    // console.log(boxMap);


    // console.log(matrix);
    sudoku(matrix, 0, 0);
    // console.log("-------");
    var flag = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (matrix[i][j] === 0) {
                return false;
            }
        }
        if (flag === false)
            return false;
    }


    if (flag) {

        return matrix;
    }
}

function boxLocation(row, col) {
    if (row >= 0 && row < 3 && col >= 0 && col < 3)
        return 1;
    if (row >= 0 && row < 3 && col >= 3 && col < 6)
        return 2;
    if (row >= 0 && row < 3 && col >= 6 && col < 9)
        return 3;
    if (row >= 3 && row < 6 && col >= 0 && col < 3)
        return 4;
    if (row >= 3 && row < 6 && col >= 3 && col < 6)
        return 5;
    if (row >= 3 && row < 6 && col >= 6 && col < 9)
        return 6;
    if (row >= 6 && row < 9 && col >= 0 && col < 3)
        return 7;
    if (row >= 6 && row < 9 && col >= 3 && col < 6)
        return 8;
    if (row >= 6 && row < 9 && col >= 6 && col < 9)
        return 9;
}
function sudoku(matrix, i, j) {
    if (i + 1 === 9 && j === 9)
        return true;
    if (j >= 9) {
        if (sudoku(matrix, i + 1, 0) === false) {
            return false;
        } else {
            return true;
        }

    }

    if (matrix[i][j] === 0) {
        var flag = true;
        for (var k = 1; k <= 9; k++) {
            if (rowMap[i][k] === undefined && colMap[j][k] === undefined && boxMap[boxLocation(i, j) - 1][k] === undefined) {
                matrix[i][j] = k;

                rowMap[i][k] = 1;
                colMap[j][k] = 1;
                boxMap[boxLocation(i, j) - 1][k] = 1;
                flag = false;

                if (sudoku(matrix, i, j + 1) === false) {
                    matrix[i][j] = 0;

                    delete rowMap[i][k];
                    delete colMap[j][k];
                    delete boxMap[boxLocation(i, j) - 1][k];
                    flag = true;


                }
            }
        }
        if (flag) {

            return false;
        }
    }
    else {
        if (sudoku(matrix, i, j + 1) === false)
            return false;
    }


}
export default solve;