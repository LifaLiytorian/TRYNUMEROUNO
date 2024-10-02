// math.js

function calculateFormula(a, x) {
  try {
      // Проверяем, что аргументы являются числами
      if (isNaN(a) || isNaN(x)) {
          throw new Error("Аргументы должны быть числами");
      }

      // Проверяем, что x не равен нулю
      if (x === 0) {
          throw new Error("Деление на ноль");
      }

      // Проверяем, что выражение под корнем не отрицательно (с учетом погрешности)
      const expressionUnderRoot = 12 * Math.pow(a, 2) + Math.sqrt(7 * a) - 16;
      if (expressionUnderRoot < 0) {
          throw new Error("Корень из отрицательного числа");
      }

      // Проверяем, что выражение под корнем в знаменателе не равно нулю (с учетом погрешности)
      const sinValue = Math.sin(3 * x);
      if (Math.abs(sinValue) < Number.EPSILON) {
          throw new Error("Деление на ноль");
      }

      // Рассчитываем формулу
      const sqrt = Math.sqrt;
      const sqr = Math.pow;
      const result = sqrt(expressionUnderRoot) / sinValue;

      // Возвращаем результат
      return result.toFixed(8); // Округляем результат до 8 знаков после запятой
  } catch (error) {
      // Обрабатываем исключительные ситуации
      alert(`Ошибка: ${error.message}`);
      return null;
  }
}

function calculateAndDisplay() {
  const a = parseFloat(document.getElementById("a").value);
  const x = parseFloat(document.getElementById("x").value);
  const result = calculateFormula(a, x);
  if (result !== null) {
      document.getElementById("result").innerHTML = `Результат: ${result}`;
  }
}