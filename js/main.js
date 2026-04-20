// Добавить обработчик кликов по картам в DOMContentLoaded:

// Обработка кликов по картам
canvas.addEventListener('click', (e) => {
    if (!core.gameState.isActive) return;
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    // Проверяем клик по картам
    const cardAreas = core.graphics.getCardAreas();
    for (let area of cardAreas) {
        if (clickX >= area.x && clickX <= area.x + area.width &&
            clickY >= area.y && clickY <= area.y + area.height) {
            // Клик по карте
            core.ui.handleCardClick(area.index, area.card);
            e.stopPropagation();
            return;
        }
    }
    
    // Если не кликнули по карте, передаем в UI для размещения
    // UI сам проверит режим размещения
    const fakeEvent = { clientX: e.clientX, clientY: e.clientY };
    const fakeMouseEvent = new MouseEvent('click', fakeEvent);
    canvas.dispatchEvent(fakeMouseEvent);
});
