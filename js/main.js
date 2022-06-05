// Функция, возвращающая случайное целое число из диапазона
const getRandomValue = function(minValue, maxValue) {
  if (minValue >= 0 && minValue < maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }
  else {
    if (minValue<0) {return 'Введите положительные числа';}
    else {
      if  (minValue>=maxValue) {return 'Начальное значение должно быть меньше конечного';}
    }
  }
};

getRandomValue (10,22);

const getRandomValueFloat = function(minValue, maxValue, float) {
  if (minValue >= 0 && minValue < maxValue) {
    return (Math.random() * (maxValue - minValue) + minValue).toFixed(float);
  }
  else {
    if (minValue<0) {return 'Введите положительные числа';}
    else {
      if  (minValue>=maxValue) {return 'Начальное значение должно быть меньше конечного';}
    }
  }
};

getRandomValueFloat (1.1, 1.2, 3);
