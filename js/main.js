/**
 * @fileoverview Главный игровой цикл. Управляет отрисовкой игры.
 * @author Ваше имя
 * @version 1.0.0
 */

/**
 * IIFE (Immediately Invoked Function Expression) - изолирует код от глобальной области
 * @description Инициализирует игру и запускает бесконечный цикл рендеринга
 */
(function() {
    // ==================== ИНИЦИАЛИЗАЦИЯ ====================
    
    /**
     * Элемент canvas, на котором рисуется игра
     * @type {HTMLCanvasElement}
     */
    const canvas = document.getElementById('gameCanvas');
    
    /**
     * 2D контекст для рисования на canvas
     * @type {CanvasRenderingContext2D}
     */
    const ctx = canvas.getContext('2d');
    
    /**
     * Инициализация графической системы
     * @function Graphics.init
     * @param {CanvasRenderingContext2D} ctx - контекст рисования
     * @description Сохраняет контекст, настраивает размеры, загружает спрайты
     */
    Graphics.init(ctx);
    
    /**
     * Инициализация пользовательского интерфейса
     * @function UI.init
     * @param {HTMLCanvasElement} canvas - элемент canvas для обработки событий
     * @description Навешивает обработчики кликов, drag-and-drop для карт
     */
    UI.init(canvas);
    
    /**
     * Запуск боевой логики
     * @function GameState.startBattle
     * @description Создаёт башни игрока и врага, запускает спавн юнитов
     */
    GameState.startBattle();
    
    // ==================== ФУНКЦИЯ РЕНДЕРИНГА ====================
    
    /**
     * Основная функция отрисовки кадра
     * @function render
     * @description Вызывается 60 раз в секунду (или чаще, в зависимости от монитора)
     * @returns {void}
     */
    function render() {
        // 1. Отрисовка фона и игрового поля
        Graphics.drawArena();
        
        // 2. Отрисовка игровых объектов (башни, короли)
        Graphics.drawPlayerTower();      // Башня игрока (левая сторона)
        Graphics.drawEnemyTower();       // Башня врага (правая сторона)
        Graphics.drawKingTower(true);    // Башня короля-игрока (true = свой)
        Graphics.drawKingTower(false);   // Башня короля-врага (false = чужой)
        
        // 3. Отрисовка интерфейса (здоровье, эликсир, карты)
        Graphics.drawUI();
        
        // 4. Отрисовка всех юнитов на поле
        /** @type {Array<Unit>} */
        const units = GameState.getUnits();
        
        for (let i = 0; i < units.length; i++) {
            Graphics.drawUnit(units[i]);
        }
        
        // 5. Запрос следующего кадра (создаёт бесконечный цикл)
        requestAnimationFrame(render);
    }
    
    // ==================== ЗАПУСК ====================
    
    /** Запускаем первый кадр */
    render();
    
    /** Логирование успешного старта (для отладки) */
    console.log('Stage 1: Game initialized - static graphics ready');
})();
