

export const calculateSettings = (waterSystem, saltTank, gridPlate, hardness, iron, manganese, reverseOsmosis) => {
    const calculatedHardness = Number(hardness) + (Number(iron) * 4) + (Number(manganese) * 4) + (reverseOsmosis ? 2 : 0);
    const pairs = gridCalculations[waterSystem](calculatedHardness);
    return {calculatedHardness, pairs};
};

function findClosestPairs(table, target) {
  // Flatten the table into a 1D array of objects
  const flattened = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      flattened.push({
        row: i + 1,  // Add 1 because row and column headers start from 1
        col: j + 1,
        value: table[i][j]
      });
    }
  }
 
  // Sort the array based on the absolute difference between the target number and each value
  flattened.sort((a, b) => Math.abs(target - a.value) - Math.abs(target - b.value));

  // Slice the array to get the first three elements
  const closestPairs = flattened.slice(0, 3);

  // Convert the closest pairs to the desired output format
  return closestPairs.map(pair => [pair.row, pair.col, pair.value]);
}


const gridCalculations = { 
    "Q237":  (compensatedHardness) => {
        const table =[
            [4, 8, 12, 16, 20, 24, 27, 30],
            [5, 10, 15, 20, 24, 29, 33, 37]
        ];
                
        const saltSettings = ["1.0 lb", "1.5 lb"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};        
    },
    "2030s": (compensatedHardness) => {
        // 4 10 14 19 23 27 31 34
        // 6 12 18 23 28 33 38 43
        const table =[
            [4, 10, 14, 19, 23, 27, 31, 34],
            [6, 12, 18, 23, 28, 33, 38, 43]
        ]

        const saltSettings = ["1.8 lb", "2.7 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    },
    "2040s OD": (compensatedHardness) => {
        // 7 15 21 27 31 36 40 44
        const table =[
            [7, 15, 21, 27, 31, 36, 40, 44]
        ]

        const saltSettings = ["1.0 lb"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    },
    "2060s": (compensatedHardness) => {
        // 8 15 22 28 34 40 45 50
        // 9 18 27 34 41 48 54 60
        // 10 19 28 36 44 51 57 63
        // 11 20 29 38 46 53 60 66
        const table =[
            [8, 15, 22, 28, 34, 40, 45, 50],
            [9, 18, 27, 34, 41, 48, 54, 60],
            [10, 19, 28, 36, 44, 51, 57, 63],
            [11, 20, 29, 38, 46, 53, 60, 66]
        ]

        const saltSettings = ["2.7 lbs", "3.6 lbs", "4.0 lbs", "4.4 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    },
    "2060s OD": (compensatedHardness) => {
        // 3 6 9 11 14 17 19 22
        // 4 7 11 15 18 21 25 28
        // 4 8 12 16 19 23 26 30
        const table =[
            [3, 6, 9, 11, 14, 17, 19, 22],
            [4, 7, 11, 15, 18, 21, 25, 28],
            [4, 8, 12, 16, 19, 23, 26, 30]
        ]

        const saltSettings = ["2.7 lbs", "4.0 lbs", "4.4 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    },
    "2100s": (compensatedHardness) => {
        // 11 21 30 38 0 0 0 0
        // 14 26 38 48 0 0 0 0
        // 17 32 46 58 67 76 85 94
        // 19 37 52 66 76 88 98 107
        const table =[
            [11, 21, 30, 38, 0, 0, 0, 0],
            [14, 26, 38, 48, 0, 0, 0, 0],
            [17, 32, 46, 58, 67, 76, 85, 94],
            [19, 37, 52, 66, 76, 88, 98, 107]
        ]

        const saltSettings = ["5.5 lbs", "7.5 lbs", "10 lbs", "15 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    },
    "2100s OD": (compensatedHardness) => {
        // 5 10 14 18 22 25 28 30
        // 8 15 22 27 33 38 42 46
        // 10 19 27 34 40 46 52 57
        const table =[
            [5, 10, 14, 18, 22, 25, 28, 30],
            [8, 15, 22, 27, 33, 38, 42, 46],
            [10, 19, 27, 34, 40, 46, 52, 57]
        ]

        const saltSettings = ["5.5 lbs", "10.0 lbs", "15.0 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};

    },
    "2175s": (compensatedHardness) => {
        // 27 50 70 88 103 117 129 140
        const table =[
            [27, 50, 70, 88, 103, 117, 129, 140]
        ]

        const saltSettings = ["15 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
        
    },
    "4040s OD": (compensatedHardness) => {
        // 7 15 21 27 31 36 40 44
        const table =[
            [7, 15, 21, 27, 31, 36, 40, 44]
        ]

        const saltSettings = ["1.0 lb"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    },
    "4060s OD": (compensatedHardness) => {
        // 4 8 12 15 18 21 24 26
        // 4 9 13 16 20 23 25 28
        // 5 9 14 18 21 25 28 31
        const table =[
            [4, 8, 12, 15, 18, 21, 24, 26],
            [4, 9, 13, 16, 20, 23, 25, 28],
            [5, 9, 14, 18, 21, 25, 28, 31]
        ]

        const saltSettings = ["3.3 lbs", "3.6 lbs", "4.0 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};

    },
    "4060s OD MAC": (compensatedHardness) => {
        // 4 9 15 20 25 31 37 42
        const table =[
            [4, 9, 15, 20, 25, 31, 37, 42]
        ]

        const saltSettings = ["4.4 lbs"]
        return {saltSettings, pairs: findClosestPairs(table, compensatedHardness)};
    }
}

export const calculateAdjustTubeAndFloat = (settingRow, saltTank, waterSystem, gridPlate) => {
    const saltTankOptions = ["18 x 33 or 18 x 35", "12 x 16 x 20", "11 x 11 x 38 or 12 x 40"];
    
    switch (waterSystem) {
        case "Q237":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "1.0", float: "7 3/4"};
                        }
                        return {adjustTube: "J", float: "6"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "1.25", float: "7 3/4"};
                    }
                    return {adjustTube: "K", float: "6"};                
                case "12 x 16 x 20":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "1.5", float: "7 1/4"};
                        }
                        return {adjustTube: "L", float: "6"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "1.5", float: "7 1/2"};
                    }
                    return {adjustTube: "L", float: "6 1/4"};
                case "11 x 11 x 38 or 12 x 40":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "1.0", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "6"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "1.0", float: "8 3/4"};
                    }
                    return {adjustTube: "N", float: "6 1/4"};
            }
        case "2030s":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "A", float: "7 3/4"};
                        }
                        return {adjustTube: "M", float: "6"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "D", float: "7 3/4"};
                    }
                    return {adjustTube: "N", float: "6"};                
                case "12 x 16 x 20":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "B", float: "7 1/2"};
                        }
                        return {adjustTube: "N", float: "6"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "E", float: "7 1/2"};
                    }
                    return {adjustTube: "N", float: "7"};
                case "11 x 11 x 38 or 12 x 40":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "A", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "7 1/4"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "H", float: "8 5/8"};
                    }
                    return {adjustTube: "N", float: "8 1/4"};
            }
        case "2040s OD":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":                    
                    if (gridPlate) {
                        return {adjustTube: "1", float: "7 3/4"};
                    }
                    return {adjustTube: "J", float: "6"};                
                case "12 x 16 x 20":
                    if (gridPlate) {
                        return {adjustTube: "1.5", float: "7 1/4"};
                    }
                    return {adjustTube: "L", float: "6"};
                case "11 x 11 x 38 or 12 x 40":
                    if (gridPlate) {
                        return {adjustTube: "1", float: "8 5/8"};
                    }
                    return {adjustTube: "N", float: "6"};
            }
        case "2060s":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "D", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "6"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "G", float: "7 3/4"};
                        }
                        return {adjustTube: "L", float: "7 1/4"};
                    } else if (settingRow === 3) {
                        if (gridPlate) {
                            return {adjustTube: "H", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "6 3/4"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "J", float: "7 3/4"};
                    }
                    return {adjustTube: "N", float: "7"};                
                case "12 x 16 x 20":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "E", float: "7 1/2"};
                        }
                        return {adjustTube: "N", float: "7"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "N/A", float: "N/A"};
                        }
                        return {adjustTube: "N/A", float: "N/A"};
                    } else if (settingRow === 3) {
                        if (gridPlate) {
                            return {adjustTube: "N/A", float: "N/A"};
                        }
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N/A", float: "N/A"};
                case "11 x 11 x 38 or 12 x 40":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "H", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "8 1/4"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "M", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "9 3/4"};
                    } else if (settingRow === 3) {
                        if (gridPlate) {
                            return {adjustTube: "N", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "10 1/4"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N", float: "10 3/4"};
            }
        case "2060s OD":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "D", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "6"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "H", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "6 3/4"};
                    } 
                    if (gridPlate) {
                        return {adjustTube: "J", float: "7 3/4"};
                    }
                    return {adjustTube: "N", float: "7"};                
                case "12 x 16 x 20":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "E", float: "7 1/2"};
                        }
                        return {adjustTube: "N", float: "7"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "N/A", float: "N/A"};
                        }
                        return {adjustTube: "N/A", float: "N/A"};
                    } 
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N/A", float: "N/A"};
                case "11 x 11 x 38 or 12 x 40":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "H", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "8 1/4"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "N", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "10 1/4"};
                    } 
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N", float: "10 3/4"};
            }
        case "2100s":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "L", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "7 3/4"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "N", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "9"};
                    } else if (settingRow === 3) {
                        if (gridPlate) {
                            return {adjustTube: "N", float: "9 1/2"};
                        }
                        return {adjustTube: "N", float: "10 3/4"};
                    }
                    if (gridPlate) {
                        return {adjustTube: "N", float: "13 3/8"};
                    }
                    return {adjustTube: "N", float: "14 3/4"};                
                case "12 x 16 x 20":
                    return {adjustTube: "N/A", float: "N/A"};
                case "11 x 11 x 38 or 12 x 40":
                    return {adjustTube: "N/A", float: "N/A"};
            }
        case "2100s OD":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "L", float: "7 3/4"};
                        }
                        return {adjustTube: "N", float: "7 3/4"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "N", float: "9 1/2"};
                        }
                        return {adjustTube: "N", float: "10 3/4"};
                    } 
                    if (gridPlate) {
                        return {adjustTube: "N", float: "13 3/8"};
                    }
                    return {adjustTube: "N", float: "14 3/4"};                
                case "12 x 16 x 20":
                    return {adjustTube: "N/A", float: "N/A"};
                case "11 x 11 x 38 or 12 x 40":
                    return {adjustTube: "N/A", float: "N/A"};                    
            }
        case "2175s":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (gridPlate) {
                        return {adjustTube:"N", float: "13 3/8"};
                    }
                    return {adjustTube: "N", float: "14 3/4"};                
                case "12 x 16 x 20":
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N/A", float: "N/A"};
                case "11 x 11 x 38 or 12 x 40":
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N/A", float: "N/A"};
            }
        case "4040s OD":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (gridPlate) {
                        return {adjustTube: "1.0", float: "7 3/4"};
                    }
                    return {adjustTube: "J", float: "6"};                
                case "12 x 16 x 20":
                    if (gridPlate) {
                        return {adjustTube: "1.5", float: "7 1/4"};
                    }
                    return {adjustTube: "L", float: "6"};
                case "11 x 11 x 38 or 12 x 40":
                    if (gridPlate) {
                        return {adjustTube: "1.0", float: "8 5/8"};
                    }
                    return {adjustTube: "N", float: "6"};
            }
        case "4060s OD":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "F", float: "7 1/2"};
                        }
                        return {adjustTube: "N", float: "6 1/2"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "G", float: "7 3/4"};
                        }
                        return {adjustTube: "L", float: "7 1/4"};
                    } 
                    if (gridPlate) {
                        return {adjustTube: "H", float: "7 3/4"};
                    }
                    return {adjustTube: "N", float: "6 3/4"};                
                case "12 x 16 x 20":
                    return {adjustTube: "N/A", float: "N/A"};
                    
                case "11 x 11 x 38 or 12 x 40":
                    if (settingRow === 1) {
                        if (gridPlate) {
                            return {adjustTube: "L", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "9 1/4"};
                    } else if (settingRow === 2) {
                        if (gridPlate) {
                            return {adjustTube: "M", float: "8 5/8"};
                        }
                        return {adjustTube: "N", float: "9 3/4"};
                    } 
                    if (gridPlate) {
                        return {adjustTube: "N", float: "8 5/8"};
                    }
                    return {adjustTube: "N", float: "10 1/4"};
            }
        case "4060s OD MAC":
            switch (saltTank) {
                case "18 x 33 or 18 x 35":
                    if (gridPlate) {
                        return {adjustTube: "J", float: "7 3/4"};
                    }
                    return {adjustTube: "N", float: "7"};                
                case "12 x 16 x 20":
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N/A", float: "N/A"};
                case "11 x 11 x 38 or 12 x 40":
                    if (gridPlate) {
                        return {adjustTube: "N/A", float: "N/A"};
                    }
                    return {adjustTube: "N", float: "10 3/4"};
            }
    }

    
}