const SUPABASE_URL = "https://bjotojjlrvccfayyzbeq.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_L28UGJe7GU-vM_7FAmX-mg_wHwd-gcB";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const CARD_TRANSFER_NUMBER = "0 (78) 341971";
const TABLE_KEYS = ["table1", "table2", "table3", "table4", "american", "russian", "takeaway", "ps"];
const SPORT_BARTENDERS = [
    { id: "efim", defaultName: "Ефим", defaultAvatar: "Е" },
    { id: "alexandr", defaultName: "Александр", defaultAvatar: "А" }
];
const SPORT_PROFILE_STORAGE_KEY = "sport_bartender_profiles_v1";

const SYSTEM_CONFIG = {
    sport: {
        title: "Sport-Bar",
        hasServices: true,
        cloudHistory: true,
        storage: {
            receipts: "sport_receipts_v2",
            timers: "sport_timers_v2",
            history: "sport_history_v2",
            paid: "sport_paid_v2",
            paymentMethods: "sport_payment_methods_v2",
            shift: "sport_shift_v1",
            bartender: "sport_bartender_v1"
        }
    },
    cafe: {
        title: "Cafe",
        hasServices: false,
        cloudHistory: true,
        storage: {
            receipts: "cafe_receipts_v1",
            timers: "cafe_timers_v1",
            history: "cafe_history_v1",
            paid: "cafe_paid_v1",
            paymentMethods: "cafe_payment_methods_v1",
            orderCounter: "cafe_order_counter_v1"
        }
    }
};

const TABLES_BY_SYSTEM = {
    sport: [
    { key: "table1", label: "Стол 1" },
    { key: "table2", label: "Стол 2" },
    { key: "table3", label: "Стол 3" },
    { key: "table4", label: "Стол 4" },
    { key: "american", label: "Амереканский бильярд" },
    { key: "russian", label: "Русский бильярд" },
    { key: "ps", label: "PS" }
],
    cafe: [
        { key: "table1", label: "Стол 1" },
        { key: "table2", label: "Стол 2" },
        { key: "table3", label: "Стол 3" },
        { key: "table4", label: "Стол 4" },
        { key: "takeaway", label: "На вынос" }
    ]
};

const MENU_BY_SYSTEM = {
    sport: [
        {
            category: "На розлив",
            items: [
                { name: "Карлсберг 0.5", price: 40, unit: "шт" },
                { name: "Карлсберг 0.33", price: 25, unit: "шт" },
                { name: "Бланк 0.5", price: 50, unit: "шт" },
                { name: "Бланк 0.33", price: 35, unit: "шт" },
                { name: "Батяр 0.5", price: 30, unit: "шт" },
                { name: "Батяр 0.33", price: 20, unit: "шт" },
                { name: "Jack Daniel’s 50 г", price: 50, unit: "порц." },
                { name: "Jack Daniel’s 25 г", price: 40, unit: "порц." },
                { name: "Jameson 50 г", price: 40, unit: "порц." },
                { name: "Jameson 25 г", price: 30, unit: "порц." },
                { name: "Sheridan’s 50 г", price: 40, unit: "порц." },
                { name: "Sheridan’s 25 г", price: 30, unit: "порц." },
                { name: "Водка Finlandia 50 г", price: 50, unit: "порц." },
                { name: "Водка Finlandia 25 г", price: 40, unit: "порц." }
            ]
        },
        {
            category: "Пиво бутылки",
            items: [
                { name: "Grimbergen 0.33", price: 40, unit: "бут." },
                { name: "Львовское мягкое 0.5", price: 30, unit: "бут." },
                { name: "Роберт Домс 0.5", price: 30, unit: "бут." },
                { name: "Туборг 0.5", price: 35, unit: "бут." },
                { name: "Garage", price: 50, unit: "бут." }
            ]
        },
        {
            category: "Мясо, закуски",
            items: [
                { name: "Вяленая рыба", price: 40, unit: "уп." },
                { name: "Шкура свиная", price: 60, unit: "уп." },
                { name: "Карпачо", price: 60, unit: "уп." },
                { name: "Ушки", price: 60, unit: "уп." },
                { name: "Сыр косичка", price: 50, unit: "уп." },
                { name: "Орешки / гренки (доплата)", price: 25, unit: "порц." }
            ]
        },
        {
            category: "Холодные напитки",
            items: [
                { name: "Freşa", price: 20, unit: "шт" },
                { name: "Сок Campa", price: 30, unit: "шт" },
                { name: "Ice Tea", price: 25, unit: "шт" },
                { name: "Energy Drink", price: 20, unit: "шт" },
                { name: "MaxSpeed 0.25", price: 20, unit: "шт" },
                { name: "MaxSpeed 0.5", price: 30, unit: "шт" },
                { name: "Drive Energy", price: 20, unit: "шт" },
                { name: "CocaCola", price: 15, unit: "шт" },
                { name: "San Pellegrino", price: 25, unit: "шт" },
                { name: "Nordica", price: 15, unit: "шт" },
                { name: "Letto", price: 15, unit: "шт" }
            ]
        },
        {
            category: "Горячие напитки",
            items: [
                { name: "Американо", price: 25 },
                { name: "Эспрессо", price: 20 },
                { name: "Капучино", price: 28 },
                { name: "Латте Макиато", price: 30 },
                { name: "Флэт Уайт", price: 35 },
                { name: "Двойной эспрессо", price: 25 },
                { name: "Чай", price: 35, unit: "шт" }
            ]
        }
    ],
    cafe: [
        {
            category: "Snaks",
            items: [
                { name: "Хот дог Классический", price: 35, unit: "шт" },
                { name: "Хот дог сырный", price: 35, unit: "шт" },
                { name: "Тост с сыром", price: 20, unit: "шт" },
                { name: "Тост с копченной свинины", price: 20, unit: "шт" },
                { name: "Тост с Каурмой", price: 25, unit: "шт" },
                { name: "Картошка Фри", price: 30, unit: "порция" }
            ]
        },
        {
            category: "Детское меню",
            items: [
                { name: "Картошка Фри с осьминожками", price: 55, unit: "порция" },
                { name: "Картошка Фри с наггетсами", price: 65, unit: "порция" }
            ]
        },
        {
            category: "Кофе",
            items: [
                { name: "Эспрессо", price: 15, unit: "чашка" },
                { name: "Американо", price: 20, unit: "чашка" },
                { name: "Капучино", price: 25, unit: "чашка" },
                { name: "Латте Макиато", price: 25, unit: "чашка" },
                { name: "Флэт Уайт", price: 35, unit: "чашка" },
                { name: "Ристретто", price: 15, unit: "чашка" },
                { name: "Jacobs", price: 12, unit: "шт" },
                { name: "3 в 1", price: 12, unit: "шт" },
                { name: "Айс Латте", price: 45, unit: "стакан" }
            ]
        },
        {
            category: "Напитки",
            items: [
                { name: "Лимонад", price: 35, unit: "стакан" }
            ]
        },
        {
            category: "Горячий шоколад",
            items: [
                { name: "Классический", price: 30, unit: "чашка" },
                { name: "Белый", price: 40, unit: "чашка" }
            ]
        }
    ]
};

const SERVICES_DATA = [
    {
        category: "Бильярд",
        services: [
            { name: "1 стол — Русский", pricePerHour: 100 },
            { name: "2 стол — Американский", pricePerHour: 100 }
        ]
    },
    {
        category: "PlayStation",
        services: [
            { name: "1 джойстик", pricePerHour: 30 },
            { name: "2 джойстика", pricePerHour: 60 }
        ]
    }
];

let currentSystem = null;
let currentTable = "table1";
let historyViewDate = new Date();
let historySelectedDayKey = null;
let activeMenuCategoryBySystem = {
    sport: MENU_BY_SYSTEM.sport[0].category,
    cafe: MENU_BY_SYSTEM.cafe[0].category
};
let timerInterval = null;
let currentBartenderId = localStorage.getItem("sport_current_bartender_id") || "";
let currentBartenderName = localStorage.getItem("sport_current_bartender_name") || "";

const systemStates = {
    sport: createSystemState(),
    cafe: createSystemState()
};

const heroSubtitle = document.getElementById("heroSubtitle");
const systemChooser = document.getElementById("systemChooser");
const workspaceArea = document.getElementById("workspaceArea");
const sportBarBtn = document.getElementById("sportBarBtn");
const cafeBtn = document.getElementById("cafeBtn");
const ownerDashboardBtn = document.getElementById("ownerDashboardBtn");
const backToSystemsBtn = document.getElementById("backToSystemsBtn");
const currentSystemChip = document.getElementById("currentSystemChip");
const topActions = document.getElementById("topActions");
const paymentCashOnly = document.getElementById("paymentCashOnly");
const menuTabBtn = document.getElementById("menuTabBtn");
const servicesTabBtn = document.getElementById("servicesTabBtn");
const shiftControls = document.getElementById("shiftControls");
const shiftStatusText = document.getElementById("shiftStatusText");
const startShiftBtn = document.getElementById("startShiftBtn");
const endShiftBtn = document.getElementById("endShiftBtn");
const bartenderLoginPage = document.getElementById("bartenderLoginPage");
const bartenderNameInput = document.getElementById("bartenderNameInput");
const bartenderLoginBtn = document.getElementById("bartenderLoginBtn");
const bartenderButtons = document.getElementById("bartenderButtons");
const changeBartenderBtn = document.getElementById("changeBartenderBtn");
const mainWorkContent = document.getElementById("mainWorkContent");
const ownerDashboardPage = document.getElementById("ownerDashboardPage");
const ownerRefreshBtn = document.getElementById("ownerRefreshBtn");
const ownerSummaryGrid = document.getElementById("ownerSummaryGrid");
const ownerDashboardContent = document.getElementById("ownerDashboardContent");
const bartenderProfilePanel = document.getElementById("bartenderProfilePanel");
const profileAvatarBtn = document.getElementById("profileAvatarBtn");
const profileNameText = document.getElementById("profileNameText");
const profileStatsText = document.getElementById("profileStatsText");
const profileEarningsChart = document.getElementById("profileEarningsChart");
const editProfileBtn = document.getElementById("editProfileBtn");
const topProfileActions = document.getElementById("topProfileActions");
const topAvatarBtn = document.getElementById("topAvatarBtn");
const profilePageOverlay = document.getElementById("profilePageOverlay");
const closeProfilePageBtn = document.getElementById("closeProfilePageBtn");
const profilePageAvatarBtn = document.getElementById("profilePageAvatarBtn");
const profilePhotoInput = document.getElementById("profilePhotoInput");
const profilePageNameText = document.getElementById("profilePageNameText");
const profilePageStatsText = document.getElementById("profilePageStatsText");
const profilePageEarningsChart = document.getElementById("profilePageEarningsChart");
const profileEditNameBtn = document.getElementById("profileEditNameBtn");
const profileChangePhotoBtn = document.getElementById("profileChangePhotoBtn");
const profileRemovePhotoBtn = document.getElementById("profileRemovePhotoBtn");
const editNameModalOverlay = document.getElementById("editNameModalOverlay");
const editNameInput = document.getElementById("editNameInput");
const editNameCancelBtn = document.getElementById("editNameCancelBtn");
const editNameSaveBtn = document.getElementById("editNameSaveBtn");

const menuPanel = document.getElementById("menuPanel");
const servicesPanel = document.getElementById("servicesPanel");
const menuContent = document.getElementById("menuContent");
const menuCategories = document.getElementById("menuCategories");
const menuSearch = document.getElementById("menuSearch");
const servicesContent = document.getElementById("servicesContent");
const receiptItems = document.getElementById("receiptItems");
const totalPrice = document.getElementById("totalPrice");
const timersList = document.getElementById("timersList");
const timersCount = document.getElementById("timersCount");
const paidAmountInput = document.getElementById("paidAmountInput");
const paymentTotal = document.getElementById("paymentTotal");
const changeAmount = document.getElementById("changeAmount");
const paymentStatus = document.getElementById("paymentStatus");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");
const modalCancelBtn = document.getElementById("modalCancelBtn");
const modalOkBtn = document.getElementById("modalOkBtn");
const historyModalOverlay = document.getElementById("historyModalOverlay");
const historyModalList = document.getElementById("historyModalList");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const historyMonthTitle = document.getElementById("historyMonthTitle");
const historyMonthGrid = document.getElementById("historyMonthGrid");
const prevDayBtn = document.getElementById("prevDayBtn");
const nextDayBtn = document.getElementById("nextDayBtn");
const historyDayTitle = document.getElementById("historyDayTitle");
const currentTableBadge = document.getElementById("currentTableBadge");
const menuCountChip = document.getElementById("menuCountChip");
const servicesCountChip = document.getElementById("servicesCountChip");
const toastContainer = document.getElementById("toastContainer");
const deleteOrderBtn = document.getElementById("deleteOrderBtn");
const paymentMethodCash = document.getElementById("paymentMethodCash");
const paymentMethodCard = document.getElementById("paymentMethodCard");
const cardTransferInfo = document.getElementById("cardTransferInfo");
const cardTransferNumber = document.getElementById("cardTransferNumber");

sportBarBtn?.addEventListener("click", () => selectSystem("sport"));
cafeBtn?.addEventListener("click", () => selectSystem("cafe"));
ownerDashboardBtn?.addEventListener("click", openOwnerDashboard);
ownerRefreshBtn?.addEventListener("click", loadOwnerDashboard);
backToSystemsBtn?.addEventListener("click", backToSystemSelection);
menuTabBtn?.addEventListener("click", () => switchTab("menu"));
servicesTabBtn?.addEventListener("click", () => switchTab("services"));
menuSearch?.addEventListener("input", renderMenu);
paidAmountInput?.addEventListener("input", handlePaidAmountInput);
paymentMethodCash?.addEventListener("change", () => setPaymentMethod("cash"));
paymentMethodCard?.addEventListener("change", () => setPaymentMethod("card"));
startShiftBtn?.addEventListener("click", startSportShift);
endShiftBtn?.addEventListener("click", endSportShift);
bartenderLoginBtn?.addEventListener("click", enterSportBartenderShift);
bartenderNameInput?.addEventListener("keydown", event => { if (event.key === "Enter") enterSportBartenderShift(); });
bartenderButtons?.addEventListener("click", event => {
    const button = event.target.closest("[data-bartender-id], [data-bartender-name]");
    if (!button) return;
    selectSportBartender(button.dataset.bartenderId || button.dataset.bartenderName);
});
changeBartenderBtn?.addEventListener("click", showSportBartenderLogin);
editProfileBtn?.addEventListener("click", editCurrentBartenderProfile);
profileAvatarBtn?.addEventListener("click", openProfilePage);
topAvatarBtn?.addEventListener("click", openProfilePage);
closeProfilePageBtn?.addEventListener("click", closeProfilePage);
profilePageAvatarBtn?.addEventListener("click", chooseProfilePhoto);
profileChangePhotoBtn?.addEventListener("click", chooseProfilePhoto);
profileRemovePhotoBtn?.addEventListener("click", removeCurrentBartenderPhoto);
profilePhotoInput?.addEventListener("change", handleProfilePhotoSelected);
profileEditNameBtn?.addEventListener("click", openEditNameModal);
editNameCancelBtn?.addEventListener("click", closeEditNameModal);
editNameSaveBtn?.addEventListener("click", saveNameFromModal);
editNameInput?.addEventListener("keydown", event => { if (event.key === "Enter") saveNameFromModal(); });
document.addEventListener("click", event => {
    const filterBtn = event.target.closest("[data-owner-filter]");
    if (filterBtn) {
        document.querySelectorAll("[data-owner-filter]").forEach(btn => btn.classList.remove("active"));
        filterBtn.classList.add("active");
        renderOwnerDashboard(window.__ownerDashboardData || { receipts: [], shifts: [] }, filterBtn.dataset.ownerFilter || "all");
    }
});

prevMonthBtn?.addEventListener("click", async () => {
    historyViewDate.setFullYear(historyViewDate.getFullYear() - 1);
    await loadHistoryForCurrentSystem();
});

nextMonthBtn?.addEventListener("click", async () => {
    historyViewDate.setFullYear(historyViewDate.getFullYear() + 1);
    await loadHistoryForCurrentSystem();
});

prevDayBtn?.addEventListener("click", () => moveHistoryDay(1));
nextDayBtn?.addEventListener("click", () => moveHistoryDay(-1));

function createSystemState() {
    return {
        receipts: createEmptyReceipts(),
        paidAmounts: createEmptyPaidAmounts(),
        paymentMethods: createEmptyPaymentMethods(),
        shift: null,
        receiptHistory: [],
        activeTimers: [],
        orderCounter: 1,
        shift: null,
        bartenderName: ""
    };
}

function createEmptyReceipts() {
    return {
        table1: [],
        table2: [],
        table3: [],
        table4: [],
        american: [],
        russian: [],
        takeaway: [],
        ps: []
    };
}

function createEmptyPaidAmounts() {
    return {
        table1: "",
        table2: "",
        table3: "",
        table4: "",
        american: "",
        russian: "",
        takeaway: "",
        ps: ""
    };
}

function createEmptyPaymentMethods() {
    return {
        table1: "cash",
        table2: "cash",
        table3: "cash",
        table4: "cash",
        american: "cash",
        russian: "cash",
        takeaway: "cash",
        ps: "cash"
    };
}

function getState() {
    return currentSystem ? systemStates[currentSystem] : null;
}

function getCurrentMenu() {
    return currentSystem ? MENU_BY_SYSTEM[currentSystem] : [];
}

function getActiveMenuCategory() {
    const menu = getCurrentMenu();
    const current = activeMenuCategoryBySystem[currentSystem];
    if (menu.some(category => category.category === current)) {
        return current;
    }
    const fallback = menu[0]?.category || "";
    activeMenuCategoryBySystem[currentSystem] = fallback;
    return fallback;
}

function setActiveMenuCategory(value) {
    activeMenuCategoryBySystem[currentSystem] = value;
}

function isCafeOrderKey(key) {
    return typeof key === "string" && key.startsWith("order_");
}

function getCafeOrderKeys(state = getState()) {
    if (!state) return [];
    return Object.keys(state.receipts || {})
        .filter(isCafeOrderKey)
        .sort((a, b) => {
            const aNum = Number(a.replace("order_", "")) || 0;
            const bNum = Number(b.replace("order_", "")) || 0;
            return aNum - bNum;
        });
}

function createCafeOrder() {
    if (!["cafe", "sport"].includes(currentSystem)) return;

    if (currentSystem === "sport") {
        if (!currentBartenderName) {
            showSportBartenderLogin();
            return;
        }
        if (!getState()?.shift?.active) {
            showAlert("Сначала нажмите «Начать смену», а потом создайте заказ.", "Смена не начата");
            return;
        }
    }

    const state = getState();
    const existingOrderKeys = getCafeOrderKeys(state);

    let nextNumber = 1;
    while (existingOrderKeys.includes(`order_${nextNumber}`)) {
        nextNumber++;
    }

    const orderKey = `order_${nextNumber}`;

    state.receipts[orderKey] = [];
    state.paidAmounts[orderKey] = "";
    state.paymentMethods[orderKey] = "cash";

    if (cardTransferInfo) {
        cardTransferInfo.classList.add("hidden");
    }

    currentTable = orderKey;
    saveCurrentSystemState();
    renderTablesSwitch();
    updateCurrentTableBadge();
    renderPaymentMethodControls();
    renderReceipt();
    renderPaymentInfo();
    renderTableStatuses();
    showToast("Заказ создан.", "success", "Готово");
}
function getCafeOrderLabel(orderKey) {
    const num = String(orderKey).replace("order_", "");
    return `Заказ #${num}`;
}
window.createCafeOrder = createCafeOrder;


function openOwnerDashboard() {
    currentSystem = "owner";
    systemChooser?.classList.add("hidden");
    workspaceArea?.classList.remove("hidden");
    workspaceArea?.classList.add("workspace-enter");
    if (heroSubtitle) heroSubtitle.textContent = "Кабинет хозяина";
    if (currentSystemChip) currentSystemChip.textContent = "Хозяин Sport Bar";
    bartenderLoginPage?.classList.add("hidden");
    shiftControls?.classList.add("hidden");
    mainWorkContent?.classList.add("hidden");
    topActions?.classList.add("hidden");
    topProfileActions?.classList.add("hidden");
    ownerDashboardPage?.classList.remove("hidden");
    loadOwnerDashboard();
}
window.openOwnerDashboard = openOwnerDashboard;

function getOwnerBartenders() {
    const profiles = getBartenderProfiles();
    return ["efim", "alexandr"].map(id => ({
        id,
        name: profiles[id]?.name || (id === "efim" ? "Ефим" : "Александр"),
        avatar: profiles[id]?.photo || ""
    }));
}

async function loadOwnerDashboard() {
    if (!ownerDashboardContent) return;
    ownerDashboardContent.innerHTML = '<p class="empty-text">Загрузка данных...</p>';
    let data = { receipts: [], shifts: [] };
    try {
        data = await loadOwnerDataFromCloud();
    } catch (error) {
        console.warn("Не удалось загрузить данные хозяина из базы, использую локальные данные:", error);
    }
    if (!data.receipts.length && !data.shifts.length) {
        data = loadOwnerDataFromLocalStorage();
    }
    window.__ownerDashboardData = data;
    const activeFilter = document.querySelector("[data-owner-filter].active")?.dataset.ownerFilter || "all";
    renderOwnerDashboard(data, activeFilter);
}

async function loadOwnerDataFromCloud() {
    const start = new Date(historyViewDate.getFullYear(), historyViewDate.getMonth(), 1).toISOString();
    const end = new Date(historyViewDate.getFullYear(), historyViewDate.getMonth() + 1, 1).toISOString();
    let receipts = [];
    let shifts = [];
    const receiptResponse = await supabaseClient
        .from("receipts_history")
        .select("*")
        .gte("created_at", start)
        .lt("created_at", end)
        .order("created_at", { ascending: false });
    if (!receiptResponse.error) {
        receipts = (receiptResponse.data || [])
            .map(item => normalizeHistoryItem(item))
            .filter(item => item.bartenderName || item.shiftId);
    }
    try {
        const shiftResponse = await supabaseClient
            .from("sport_shift_sessions")
            .select("*")
            .order("started_at", { ascending: false });
        if (!shiftResponse.error) {
            shifts = (shiftResponse.data || []).map(normalizeOwnerShift);
        }
    } catch (error) {
        console.warn("Таблица sport_shift_sessions пока не доступна:", error);
    }
    return { receipts, shifts };
}

function loadOwnerDataFromLocalStorage() {
    const receipts = [];
    const shifts = [];
    const prevSystem = currentSystem;
    const prevId = currentBartenderId;
    const prevName = currentBartenderName;
    getOwnerBartenders().forEach(bartender => {
        currentSystem = "sport";
        currentBartenderId = bartender.id;
        currentBartenderName = bartender.name;
        const state = createSystemState();
        const keys = getStorageKeys("sport");
        try {
            const savedHistory = JSON.parse(localStorage.getItem(keys.history) || "[]");
            if (Array.isArray(savedHistory)) receipts.push(...savedHistory.map(item => normalizeHistoryItem({ ...item, bartenderName: item.bartenderName || bartender.name })));
            const savedShift = JSON.parse(localStorage.getItem(keys.shift) || "null");
            if (savedShift) shifts.push(normalizeOwnerShift({
                id: savedShift.id,
                bartender_id: bartender.id,
                bartender_name: savedShift.bartenderName || bartender.name,
                active: Boolean(savedShift.active),
                started_at: savedShift.startedAtISO,
                ended_at: savedShift.endedAtISO || null,
                business_date: savedShift.businessDateKey || ""
            }));
        } catch (error) {
            console.warn("Ошибка чтения локальной истории хозяина:", error);
        }
    });
    currentSystem = prevSystem;
    currentBartenderId = prevId;
    currentBartenderName = prevName;
    return { receipts, shifts };
}

function normalizeOwnerShift(item) {
    return {
        id: item.id || item.shift_id || crypto.randomUUID(),
        bartenderId: item.bartender_id || slugifyStorageKey(item.bartender_name || item.bartenderName || ""),
        bartenderName: item.bartender_name || item.bartenderName || "Бармен",
        active: Boolean(item.active),
        startedAtISO: item.started_at || item.startedAtISO || "",
        endedAtISO: item.ended_at || item.endedAtISO || "",
        businessDateKey: item.business_date || item.businessDateKey || ""
    };
}

function renderOwnerDashboard(data, filter = "all") {
    const bartenders = getOwnerBartenders();
    const receipts = (data.receipts || []).filter(item => filter === "all" || getOwnerBartenderIdByName(item.bartenderName) === filter);
    const shifts = (data.shifts || []).filter(item => filter === "all" || getOwnerBartenderIdByName(item.bartenderName) === filter || item.bartenderId === filter);
    renderOwnerSummary(bartenders, data);
    const groups = buildOwnerShiftGroups(receipts, shifts);
    if (!groups.length) {
        ownerDashboardContent.innerHTML = '<p class="empty-text">Пока нет закрытых чеков за выбранный месяц.</p>';
        return;
    }
    ownerDashboardContent.innerHTML = groups.map(group => {
        const cash = group.receipts.filter(x => normalizePaymentMethod(x.paymentMethod) !== "card").reduce((sum, x) => sum + Number(x.total || 0), 0);
        const card = group.receipts.filter(x => normalizePaymentMethod(x.paymentMethod) === "card").reduce((sum, x) => sum + Number(x.total || 0), 0);
        return `
            <article class="owner-shift-card glass-inner">
                <div class="owner-shift-top">
                    <div>
                        <div class="owner-shift-title">${escapeHtml(group.label)} • ${escapeHtml(group.bartenderName)}</div>
                        <div class="owner-shift-sub">${formatOwnerTimeRange(group.startedAtISO, group.endedAtISO)}</div>
                    </div>
                    <div class="owner-shift-total">${formatMoney(group.total)} лей</div>
                </div>
                <div class="owner-stats-row">
                    <span>Чеков: <strong>${group.receipts.length}</strong></span>
                    <span>Наличные: <strong>${formatMoney(cash)} лей</strong></span>
                    <span>Карта: <strong>${formatMoney(card)} лей</strong></span>
                    <span class="${group.active ? 'owner-live' : ''}">${group.active ? 'Смена открыта' : 'Смена закрыта'}</span>
                </div>
                <div class="owner-receipts-list">
                    ${group.receipts.map(item => `
                        <div class="owner-receipt-row">
                            <div><strong>${escapeHtml(item.table)}</strong><small>${item.itemsCount} поз. • ${escapeHtml(item.paymentMethodLabel || '')}</small></div>
                            <div><strong>${formatMoney(item.total)} лей</strong><small>${formatOnlyTime(item.createdAtISO || item.createdAt)}</small></div>
                        </div>
                    `).join("") || '<p class="empty-text">Чеков в этой смене пока нет.</p>'}
                </div>
            </article>`;
    }).join("");
}

function renderOwnerSummary(bartenders, data) {
    if (!ownerSummaryGrid) return;
    ownerSummaryGrid.innerHTML = bartenders.map(b => {
        const bReceipts = (data.receipts || []).filter(item => getOwnerBartenderIdByName(item.bartenderName) === b.id);
        const activeShift = (data.shifts || []).find(shift => (shift.bartenderId === b.id || getOwnerBartenderIdByName(shift.bartenderName) === b.id) && shift.active);
        const total = bReceipts.reduce((sum, item) => sum + Number(item.total || 0), 0);
        return `
            <article class="owner-bartender-card glass-inner">
                <div class="owner-avatar">${b.avatar ? `<img src="${b.avatar}" alt="">` : escapeHtml((b.name || '?').charAt(0).toUpperCase())}</div>
                <div>
                    <h3>${escapeHtml(b.name)}</h3>
                    <p class="${activeShift ? 'owner-live' : 'owner-off'}">${activeShift ? 'На смене сейчас' : 'Смена не начата'}</p>
                    <p>Касса за месяц: <strong>${formatMoney(total)} лей</strong></p>
                    ${activeShift ? `<p>Начало: ${escapeHtml(formatDateTime(activeShift.startedAtISO))}</p>` : ''}
                </div>
            </article>`;
    }).join("");
}

function getOwnerBartenderIdByName(name) {
    const text = String(name || "").toLowerCase();
    if (text.includes("еф") || text.includes("ef")) return "efim";
    if (text.includes("алекс") || text.includes("alex") || text.includes("сан")) return "alexandr";
    return slugifyStorageKey(text);
}

function buildOwnerShiftGroups(receipts, shifts) {
    const map = new Map();
    shifts.forEach(shift => {
        const key = shift.id || `${shift.bartenderName}_${shift.startedAtISO}`;
        map.set(key, {
            id: key,
            bartenderName: shift.bartenderName,
            active: shift.active,
            startedAtISO: shift.startedAtISO,
            endedAtISO: shift.endedAtISO,
            label: getShiftRangeLabel({ startedAtISO: shift.startedAtISO, endedAtISO: shift.endedAtISO || shift.startedAtISO }),
            receipts: [],
            total: 0
        });
    });
    receipts.forEach(item => {
        const key = item.shiftId || `${item.bartenderName}_${item.businessDateKey || getDayKey(item.createdAtISO)}`;
        if (!map.has(key)) {
            map.set(key, {
                id: key,
                bartenderName: item.bartenderName || "Бармен",
                active: false,
                startedAtISO: item.shiftStartedAtISO || item.createdAtISO,
                endedAtISO: item.shiftEndedAtISO || "",
                label: getShiftRangeLabel({ startedAtISO: item.shiftStartedAtISO || item.createdAtISO, endedAtISO: item.shiftEndedAtISO || item.createdAtISO }),
                receipts: [],
                total: 0
            });
        }
        const group = map.get(key);
        group.receipts.push(item);
        group.total += Number(item.total || 0);
        if (!group.endedAtISO && item.shiftEndedAtISO) group.endedAtISO = item.shiftEndedAtISO;
    });
    return Array.from(map.values()).sort((a, b) => String(b.startedAtISO).localeCompare(String(a.startedAtISO)));
}

function formatOwnerTimeRange(start, end) {
    const left = start ? formatDateTime(start) : "начало не указано";
    const right = end ? formatDateTime(end) : "смена открыта";
    return `${left} — ${right}`;
}

function selectSystem(systemKey) {
    currentSystem = systemKey;
    currentTable = systemKey === "cafe" ? null : "table1";
    historySelectedDayKey = null;

    const selectedBtn = systemKey === "sport" ? sportBarBtn : cafeBtn;
    const otherBtn = systemKey === "sport" ? cafeBtn : sportBarBtn;

    selectedBtn?.classList.add("selected");
    otherBtn?.classList.add("faded");

    setTimeout(() => {
        systemChooser.classList.add("chooser-leave");
    }, 120);

    setTimeout(() => {
        systemChooser.classList.add("hidden");
        workspaceArea.classList.remove("hidden");
        workspaceArea.classList.add("workspace-enter");
        ownerDashboardPage?.classList.add("hidden");

        if (heroSubtitle) heroSubtitle.textContent = SYSTEM_CONFIG[systemKey].title;
        if (currentSystemChip) currentSystemChip.textContent = SYSTEM_CONFIG[systemKey].title;

        const hasServices = SYSTEM_CONFIG[systemKey].hasServices;

        if (systemKey === "sport") {
            loadSystemState("sport");
            showSportBartenderLogin();
            return;
        } else {
            hideSportBartenderLogin();
            shiftControls?.classList.add("hidden");
    bartenderLoginPage?.classList.add("hidden");
    mainWorkContent?.classList.remove("hidden");
    topProfileActions?.classList.add("hidden");
            topActions.classList.toggle("hidden", !hasServices);
            servicesPanel.classList.toggle("hidden", !hasServices);
            mainWorkContent?.classList.remove("hidden");
            switchTab("menu");
            loadSystemIntoView();
        }
    }, 650);
}

function backToSystemSelection() {
    currentSystem = null;

    workspaceArea.classList.add("hidden");
    workspaceArea.classList.remove("workspace-enter");

    systemChooser.classList.remove("hidden", "chooser-leave");

    sportBarBtn?.classList.remove("selected", "faded");
    cafeBtn?.classList.remove("selected", "faded");

    historyModalOverlay.classList.add("hidden");
    shiftControls?.classList.add("hidden");
    bartenderLoginPage?.classList.add("hidden");
    mainWorkContent?.classList.remove("hidden");
    topProfileActions?.classList.add("hidden");
    ownerDashboardPage?.classList.add("hidden");
    closeProfilePage();

    if (heroSubtitle) heroSubtitle.textContent = "Выберите систему";
}

function loadSystemIntoView() {
    if (!currentSystem) return;

    const state = getState();
    if (currentSystem === "cafe" || currentSystem === "sport") {
        const orders = getCafeOrderKeys(state);
        if (!currentTable || !state.receipts[currentTable] || !isCafeOrderKey(currentTable)) {
            currentTable = orders[0] || null;
        }
    } else if (!currentTable) {
        currentTable = "table1";
    }

    if (paidAmountInput) {
        paidAmountInput.value = currentTable ? (state.paidAmounts[currentTable] || "") : "";
    }

    renderTablesSwitch();
    renderShiftControls();

    renderCategoryTabs();
    renderMenu();
    renderServices();
    renderReceipt();
    renderTimers();
    renderPaymentMethodControls();
    renderPaymentInfo();
    renderTableStatuses();
    updateCurrentTableBadge();
}

function switchTab(tab) {
    const isMenu = tab === "menu" || !SYSTEM_CONFIG[currentSystem]?.hasServices;
    menuTabBtn?.classList.toggle("active", isMenu);
    servicesTabBtn?.classList.toggle("active", !isMenu);
    menuPanel?.classList.toggle("active", isMenu);
    servicesPanel?.classList.toggle("active", !isMenu);
}

function switchTable(table, btn) {
    if (!currentSystem || !table) return;
    currentTable = table;
    document.querySelectorAll(".table-btn[data-table-key]").forEach(x => x.classList.remove("active"));
    if (btn) btn.classList.add("active");

    if (paidAmountInput) {
        paidAmountInput.value = getState().paidAmounts[currentTable] || "";
    }

    updateCurrentTableBadge();
    renderPaymentMethodControls();
    renderReceipt();
    renderPaymentInfo();
    renderTableStatuses();
}
window.switchTable = switchTable;

function updateCurrentTableBadge() {
    if (!currentTableBadge) return;
    if (!currentTable) {
        currentTableBadge.textContent = (currentSystem === "cafe" || currentSystem === "sport") ? "Заказ не выбран" : "Стол 1";
        return;
    }
    currentTableBadge.textContent = getTableTitle(currentTable);
}

function renderTablesSwitch() {
    if (!currentSystem) return;

    const tablesSwitch = document.getElementById("tablesSwitch");
    if (!tablesSwitch) return;

    tablesSwitch.innerHTML = "";

    if (currentSystem === "cafe" || currentSystem === "sport") {
        const createBtn = document.createElement("button");
        createBtn.className = "table-btn create-order-btn";
        createBtn.textContent = "Создать заказ +";
        createBtn.onclick = createCafeOrder;
        tablesSwitch.appendChild(createBtn);

        const orders = getCafeOrderKeys();
        if (!orders.length) {
            const empty = document.createElement("div");
            empty.className = "orders-empty-text";
            empty.textContent = "Активных заказов пока нет";
            tablesSwitch.appendChild(empty);
            return;
        }

        orders.forEach(orderKey => {
            const btn = document.createElement("button");
            btn.className = `table-btn ${currentTable === orderKey ? "active" : ""}`;
            btn.textContent = getCafeOrderLabel(orderKey);
            btn.dataset.tableKey = orderKey;
            btn.onclick = function () {
                switchTable(orderKey, this);
            };
            tablesSwitch.appendChild(btn);
        });
        return;
    }

    const tables = TABLES_BY_SYSTEM[currentSystem] || [];

    tables.forEach(table => {
        const btn = document.createElement("button");
        btn.className = `table-btn ${currentTable === table.key ? "active" : ""}`;
        btn.textContent = table.label;
        btn.dataset.tableKey = table.key;
        btn.onclick = function () {
            switchTable(table.key, this);
        };
        tablesSwitch.appendChild(btn);
    });
}

function getStorageKeys(systemKey) {
    const keys = SYSTEM_CONFIG[systemKey].storage;
    if (systemKey !== "sport" || !getCurrentBartenderStorageId()) return keys;

    const suffix = `__${slugifyStorageKey(getCurrentBartenderStorageId())}`;
    return {
        ...keys,
        receipts: `${keys.receipts}${suffix}`,
        timers: `${keys.timers}${suffix}`,
        history: `${keys.history}${suffix}`,
        paid: `${keys.paid}${suffix}`,
        paymentMethods: `${keys.paymentMethods}${suffix}`,
        shift: `${keys.shift}${suffix}`
    };
}


function getSportDeletedHistoryKey() {
    const key = getCurrentBartenderStorageId() || localStorage.getItem("sport_current_bartender_id") || localStorage.getItem("sport_current_bartender_name") || "";
    return `sport_deleted_receipt_ids__${slugifyStorageKey(key)}`;
}

function getDeletedSportReceiptIds() {
    try {
        const raw = localStorage.getItem(getSportDeletedHistoryKey()) || "[]";
        const ids = JSON.parse(raw);
        return new Set(Array.isArray(ids) ? ids.filter(Boolean) : []);
    } catch (error) {
        console.error("Ошибка чтения списка удаленных чеков:", error);
        return new Set();
    }
}

function rememberDeletedSportReceiptIds(ids) {
    if (currentSystem !== "sport") return;
    const deleted = getDeletedSportReceiptIds();
    ids.filter(Boolean).forEach(id => deleted.add(id));
    localStorage.setItem(getSportDeletedHistoryKey(), JSON.stringify(Array.from(deleted)));
}

function filterDeletedSportReceipts(history) {
    if (currentSystem !== "sport") return history;
    const deleted = getDeletedSportReceiptIds();
    return (history || []).filter(item => !deleted.has(item.id));
}

function getSupabaseErrorText(error) {
    if (!error) return "";
    return [error.message, error.details, error.hint, error.code].filter(Boolean).join(" • ");
}

async function insertReceiptToCloud(historyTable, closedReceipt) {
    const payload = {
        id: closedReceipt.id,
        table_name: closedReceipt.table,
        table_key: closedReceipt.tableKey,
        total: closedReceipt.total,
        items_count: closedReceipt.itemsCount,
        created_at: closedReceipt.createdAtISO,
        paid: closedReceipt.paid,
        change_amount: closedReceipt.change,
        shortage: closedReceipt.shortage,
        payment_status: closedReceipt.paymentStatus,
        payment_method: closedReceipt.paymentMethod,
        items: closedReceipt.items
    };

    if (historyTable === "receipts_history") {
        payload.bartender_name = closedReceipt.bartenderName || "";
        payload.shift_id = closedReceipt.shiftId || "";
        payload.shift_started_at = closedReceipt.shiftStartedAtISO || null;
        payload.shift_ended_at = closedReceipt.shiftEndedAtISO || null;
        payload.business_date = closedReceipt.businessDateKey || null;
    }

    const { error } = await supabaseClient.from(historyTable).insert([payload]);
    if (error) {
        console.error("Ошибка Supabase insert:", error);
        showAlert(`Чек НЕ сохранен в базу. Проверьте SQL setup в Supabase.\n\n${getSupabaseErrorText(error)}`, "Ошибка базы");
        return false;
    }
    return true;
}

async function deleteSportReceiptsFromCloud(receiptIds) {
    if (!receiptIds.length || !SYSTEM_CONFIG.sport.cloudHistory) return true;
    try {
        const { error } = await supabaseClient
            .from("receipts_history")
            .delete()
            .in("id", receiptIds);
        if (error) {
            console.error("Ошибка Supabase delete:", error);
            showAlert(`Чеки НЕ удалены из базы. Проверьте policy DELETE для receipts_history.\n\n${getSupabaseErrorText(error)}`, "Ошибка базы");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Ошибка удаления чеков Sport Bar из базы:", error);
        showAlert("Чеки НЕ удалены из базы. Проверьте подключение к интернету и Supabase.", "Ошибка базы");
        return false;
    }
}

function saveCurrentSystemState() {
    if (!currentSystem) return;
    const state = getState();
    const keys = getStorageKeys(currentSystem);

    localStorage.setItem(keys.receipts, JSON.stringify(state.receipts));
    localStorage.setItem(keys.timers, JSON.stringify(state.activeTimers));
    localStorage.setItem(keys.history, JSON.stringify(state.receiptHistory));
    localStorage.setItem(keys.paid, JSON.stringify(state.paidAmounts));
    localStorage.setItem(keys.paymentMethods, JSON.stringify(state.paymentMethods));
    if (keys.shift) {
        if (state.shift) localStorage.setItem(keys.shift, JSON.stringify(state.shift));
        else localStorage.removeItem(keys.shift);
    }
    if (currentSystem === "sport") {
        state.bartenderName = currentBartenderName;
        localStorage.setItem("sport_current_bartender_name", currentBartenderName || "");
    }
    if (keys.orderCounter) {
        localStorage.setItem(keys.orderCounter, String(state.orderCounter || 1));
    }
}

function loadSystemState(systemKey) {
    const keys = getStorageKeys(systemKey);
    const state = createSystemState();

    try {
        const savedReceipts = JSON.parse(localStorage.getItem(keys.receipts) || "null");
        const savedTimers = JSON.parse(localStorage.getItem(keys.timers) || "null");
        const savedHistory = JSON.parse(localStorage.getItem(keys.history) || "null");
        const savedPaid = JSON.parse(localStorage.getItem(keys.paid) || "null");
        const savedMethods = JSON.parse(localStorage.getItem(keys.paymentMethods) || "null");
        const savedShift = keys.shift ? JSON.parse(localStorage.getItem(keys.shift) || "null") : null;

        if (savedReceipts && typeof savedReceipts === "object") {
            Object.keys(savedReceipts).forEach(key => {
                if (Array.isArray(savedReceipts[key])) {
                    state.receipts[key] = savedReceipts[key];
                }
            });
        }

        if (Array.isArray(savedTimers)) {
            state.activeTimers = savedTimers.map(timer => ({
                ...timer,
                tableKey: TABLE_KEYS.includes(timer.tableKey) ? timer.tableKey : "table1",
                paused: Boolean(timer.paused),
                pausedAt: timer.pausedAt || null,
                pausedMs: Number(timer.pausedMs || 0)
            }));
        }

        if (Array.isArray(savedHistory)) {
            state.receiptHistory = savedHistory.map(item => normalizeHistoryItem(item));
            if (systemKey === "sport") {
                const deleted = getDeletedSportReceiptIds();
                state.receiptHistory = state.receiptHistory.filter(item => !deleted.has(item.id));
            }
        }

        if (savedPaid && typeof savedPaid === "object") {
            Object.keys(savedPaid).forEach(key => {
                state.paidAmounts[key] = savedPaid[key] || "";
            });
        }

        if (savedMethods && typeof savedMethods === "object") {
            Object.keys(savedMethods).forEach(key => {
                state.paymentMethods[key] = normalizePaymentMethod(savedMethods[key] || "cash");
            });
        }

        if (savedShift && typeof savedShift === "object" && savedShift.active && savedShift.businessDateKey) {
            state.shift = {
                id: savedShift.id || crypto.randomUUID(),
                active: true,
                startedAtISO: savedShift.startedAtISO || new Date().toISOString(),
                businessDateKey: savedShift.businessDateKey,
                bartenderName: savedShift.bartenderName || currentBartenderName
            };
        }

        if (keys.orderCounter) {
            state.orderCounter = Math.max(1, Number(localStorage.getItem(keys.orderCounter) || 1));
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }

    if (systemKey === "sport") state.bartenderName = currentBartenderName;
    systemStates[systemKey] = state;
}

function slugifyStorageKey(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .replaceAll("ё", "е")
        .replace(/[^a-z0-9а-я]+/gi, "_")
        .replace(/^_+|_+$/g, "") || "bartender";
}

function showSportBartenderLogin() {
    currentSystem = "sport";
    if (heroSubtitle) heroSubtitle.textContent = "Sport-Bar";
    if (currentSystemChip) currentSystemChip.textContent = "Sport-Bar";
    bartenderLoginPage?.classList.remove("hidden");
    shiftControls?.classList.add("hidden");
    topActions?.classList.add("hidden");
    mainWorkContent?.classList.add("hidden");
    topProfileActions?.classList.add("hidden");
    bartenderProfilePanel?.classList.add("hidden");
    renderSportBartenderButtons();
}
window.showSportBartenderLogin = showSportBartenderLogin;

function hideSportBartenderLogin() {
    bartenderLoginPage?.classList.add("hidden");
}

function showSportWorkspace() {
    hideSportBartenderLogin();
    shiftControls?.classList.remove("hidden");
    topActions?.classList.remove("hidden");
    mainWorkContent?.classList.remove("hidden");
    topProfileActions?.classList.remove("hidden");
    bartenderProfilePanel?.classList.add("hidden");
    renderBartenderProfile();
    if (currentSystemChip) currentSystemChip.textContent = `Sport-Bar • ${currentBartenderName}`;
    renderShiftControls();
    switchTab("menu");
    loadSystemIntoView();
}

function getDefaultProfiles() {
    return SPORT_BARTENDERS.reduce((acc, item) => {
        acc[item.id] = { id: item.id, name: item.defaultName, avatar: item.defaultAvatar };
        return acc;
    }, {});
}

function getBartenderProfiles() {
    try {
        const saved = JSON.parse(localStorage.getItem(SPORT_PROFILE_STORAGE_KEY) || "null");
        return { ...getDefaultProfiles(), ...(saved && typeof saved === "object" ? saved : {}) };
    } catch (error) {
        console.error("Ошибка профилей барменов:", error);
        return getDefaultProfiles();
    }
}

function saveBartenderProfiles(profiles) {
    localStorage.setItem(SPORT_PROFILE_STORAGE_KEY, JSON.stringify(profiles || getDefaultProfiles()));
}

function getBartenderProfile(id = currentBartenderId) {
    return getBartenderProfiles()[id] || null;
}

function getCurrentBartenderStorageId() {
    if (currentBartenderId) return currentBartenderId;
    const legacyName = currentBartenderName || localStorage.getItem("sport_current_bartender_name") || "";
    const found = SPORT_BARTENDERS.find(item => item.defaultName === legacyName);
    return found?.id || slugifyStorageKey(legacyName);
}

function getAvatarText(value, name = "") {
    const text = String(value || "").trim();
    if (text) return text.slice(0, 2).toUpperCase();
    return String(name || "Б").trim().slice(0, 1).toUpperCase() || "Б";
}

function renderSportBartenderButtons() {
    if (!bartenderButtons) return;
    const profiles = getBartenderProfiles();
    bartenderButtons.innerHTML = "";
    SPORT_BARTENDERS.forEach(item => {
        const profile = profiles[item.id] || { name: item.defaultName, avatar: item.defaultAvatar };
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `bartender-choice-btn bartender-profile-card ${currentBartenderId === item.id ? "active" : ""}`;
        btn.dataset.bartenderId = item.id;
        btn.innerHTML = `
            <span class="bartender-avatar${profile.photo ? " has-photo" : ""}" ${profile.photo ? `style="background-image:url(${profile.photo})"` : ""}>${profile.photo ? "" : escapeHtml(getAvatarText(profile.avatar, profile.name))}</span>
            <strong>${escapeHtml(profile.name || item.defaultName)}</strong>
            <small>Открыть профиль</small>
        `;
        bartenderButtons.appendChild(btn);
    });
}

function selectSportBartender(idOrName) {
    const raw = String(idOrName || "").trim();
    const byId = SPORT_BARTENDERS.find(item => item.id === raw);
    const byName = SPORT_BARTENDERS.find(item => item.defaultName === raw);
    const selected = byId || byName;
    if (!selected) {
        showAlert("Выберите бармена из списка.", "Sport Bar");
        return;
    }
    const profile = getBartenderProfile(selected.id) || { name: selected.defaultName, avatar: selected.defaultAvatar };
    currentBartenderId = selected.id;
    currentBartenderName = profile.name || selected.defaultName;
    localStorage.setItem("sport_current_bartender_id", currentBartenderId);
    localStorage.setItem("sport_current_bartender_name", currentBartenderName);
    loadSystemState("sport");
    showSportWorkspace();
    showToast(`Выбран бармен: ${currentBartenderName}. Загружены его чеки и смена.`, "success", "Sport Bar");
}
window.selectSportBartender = selectSportBartender;

function enterSportBartenderShift() {
    const name = (bartenderNameInput?.value || "").trim();
    selectSportBartender(name);
}
window.enterSportBartenderShift = enterSportBartenderShift;


function openProfilePage() {
    if (!currentBartenderId) return;
    renderBartenderProfile();
    profilePageOverlay?.classList.remove("hidden");
}
window.openProfilePage = openProfilePage;

function closeProfilePage() {
    profilePageOverlay?.classList.add("hidden");
    closeEditNameModal();
}
window.closeProfilePage = closeProfilePage;

function openEditNameModal() {
    if (!currentBartenderId) return;
    const profile = getBartenderProfile(currentBartenderId) || { name: currentBartenderName };
    if (editNameInput) editNameInput.value = profile.name || currentBartenderName || "";
    editNameModalOverlay?.classList.remove("hidden");
    setTimeout(() => editNameInput?.focus(), 50);
}
window.openEditNameModal = openEditNameModal;

function closeEditNameModal() {
    editNameModalOverlay?.classList.add("hidden");
}
window.closeEditNameModal = closeEditNameModal;

function saveNameFromModal() {
    if (!currentBartenderId) return;
    const cleanName = (editNameInput?.value || "").trim();
    if (!cleanName) {
        showAlert("Имя не может быть пустым.", "Профиль");
        return;
    }
    updateCurrentBartenderProfile({ name: cleanName });
    closeEditNameModal();
    showToast("Имя профиля обновлено.", "success", "Профиль");
}
window.saveNameFromModal = saveNameFromModal;

function updateCurrentBartenderProfile(updates) {
    if (!currentBartenderId) return;
    const profiles = getBartenderProfiles();
    const profile = profiles[currentBartenderId] || getBartenderProfile(currentBartenderId) || {};
    const nextProfile = { ...profile, id: currentBartenderId, ...updates };
    if (!nextProfile.name) nextProfile.name = currentBartenderName || "Бармен";
    if (!nextProfile.avatar) nextProfile.avatar = nextProfile.name.slice(0, 1);
    profiles[currentBartenderId] = nextProfile;
    saveBartenderProfiles(profiles);
    currentBartenderName = nextProfile.name;
    localStorage.setItem("sport_current_bartender_name", currentBartenderName);
    const state = getState();
    if (state) {
        state.bartenderName = currentBartenderName;
        if (state.shift) state.shift.bartenderName = currentBartenderName;
        saveCurrentSystemState();
    }
    renderBartenderProfile();
    renderSportBartenderButtons();
    renderShiftControls();
    if (currentSystemChip) currentSystemChip.textContent = `Sport-Bar • ${currentBartenderName}`;
}

function chooseProfilePhoto() {
    if (!currentBartenderId) return;
    profilePhotoInput?.click();
}
window.chooseProfilePhoto = chooseProfilePhoto;

function handleProfilePhotoSelected(event) {
    const file = event.target?.files?.[0];
    if (!file || !currentBartenderId) return;
    if (!file.type.startsWith("image/")) {
        showAlert("Выберите файл картинки.", "Профиль");
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        updateCurrentBartenderProfile({ photo: String(reader.result || "") });
        showToast("Фото профиля обновлено.", "success", "Профиль");
        if (profilePhotoInput) profilePhotoInput.value = "";
    };
    reader.onerror = () => showAlert("Не удалось загрузить фото.", "Профиль");
    reader.readAsDataURL(file);
}
window.handleProfilePhotoSelected = handleProfilePhotoSelected;

function removeCurrentBartenderPhoto() {
    if (!currentBartenderId) return;
    updateCurrentBartenderProfile({ photo: "" });
    showToast("Фото профиля удалено.", "success", "Профиль");
}
window.removeCurrentBartenderPhoto = removeCurrentBartenderPhoto;

function renderAvatarElement(element, profile, name) {
    if (!element) return;
    element.innerHTML = "";
    element.style.backgroundImage = "";
    if (profile?.photo) {
        element.classList.add("has-photo");
        element.style.backgroundImage = `url(${profile.photo})`;
    } else {
        element.classList.remove("has-photo");
        element.textContent = getAvatarText(profile?.avatar, name);
    }
}

function editCurrentBartenderProfile() {
    openEditNameModal();
}
window.editCurrentBartenderProfile = editCurrentBartenderProfile;

function editCurrentBartenderAvatar() {
    chooseProfilePhoto();
}
window.editCurrentBartenderAvatar = editCurrentBartenderAvatar;

function renderBartenderProfile() {
    if (!bartenderProfilePanel || currentSystem !== "sport" || !currentBartenderId) return;
    const profile = getBartenderProfile(currentBartenderId) || { name: currentBartenderName, avatar: currentBartenderName.slice(0,1) };
    currentBartenderName = profile.name || currentBartenderName;
    if (profileNameText) profileNameText.textContent = currentBartenderName;
    if (profilePageNameText) profilePageNameText.textContent = currentBartenderName;
    renderAvatarElement(profileAvatarBtn, profile, currentBartenderName);
    renderAvatarElement(topAvatarBtn, profile, currentBartenderName);
    renderAvatarElement(profilePageAvatarBtn, profile, currentBartenderName);
    const history = (getState()?.receiptHistory || []);
    const total = history.reduce((sum, item) => sum + Number(item.total || 0), 0);
    const receipts = history.length;
    const statText = receipts ? `Всего чеков: ${receipts} • касса: ${formatMoney(total)} лей` : "Пока нет закрытых чеков";
    if (profileStatsText) profileStatsText.textContent = statText;
    if (profilePageStatsText) profilePageStatsText.textContent = statText;
    renderBartenderEarningsChart();
}

function renderBartenderEarningsChart() {
    const chartTargets = [profileEarningsChart, profilePageEarningsChart].filter(Boolean);
    if (!chartTargets.length) return;
    const history = (getState()?.receiptHistory || []);
    const grouped = groupHistoryByDay(history)
        .filter(group => !group.active)
        .sort((a, b) => String(a.startedAtISO || a.dayKey).localeCompare(String(b.startedAtISO || b.dayKey)))
        .slice(-7);
    if (!grouped.length) {
        chartTargets.forEach(target => target.innerHTML = '<div class="profile-chart-empty">Статистика появится после закрытия смены</div>');
        return;
    }
    const max = Math.max(...grouped.map(group => Number(group.total || 0)), 1);
    const html = grouped.map(group => {
        const percent = Math.max(8, Math.round((Number(group.total || 0) / max) * 100));
        return `<div class="profile-chart-row">
            <span class="profile-chart-label">${escapeHtml(getShiftRangeLabel(group))}</span>
            <div class="profile-chart-bar"><i style="width:${percent}%"></i></div>
            <strong>${formatMoney(group.total)} лей</strong>
        </div>`;
    }).join("");
    chartTargets.forEach(target => target.innerHTML = html);
}

function getLocalDayKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}


function getShiftRangeLabel(group) {
    const start = new Date(group?.startedAtISO || group?.dayKey || group?.key || Date.now());
    const endSource = group?.endedAtISO || group?.lastReceiptAtISO || group?.startedAtISO || Date.now();
    const end = new Date(endSource);

    if (Number.isNaN(start.getTime())) return group?.label || "Смена";

    const startDay = String(start.getDate()).padStart(2, "0");
    if (Number.isNaN(end.getTime())) return startDay;

    const endDay = String(end.getDate()).padStart(2, "0");
    const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
    const sameDay = sameMonth && start.getDate() === end.getDate();

    if (sameDay) return startDay;
    if (sameMonth) return `${startDay}-${endDay}`;

    const startMonth = String(start.getMonth() + 1).padStart(2, "0");
    const endMonth = String(end.getMonth() + 1).padStart(2, "0");
    return `${startDay}.${startMonth}-${endDay}.${endMonth}`;
}

function getShiftFullLabel(group) {
    if (currentSystem !== "sport" || !group?.shiftId) return group?.label || formatDayHeading(group?.dayKey || group?.key || "");
    return `Смена ${getShiftRangeLabel(group)}`;
}

function getSportShiftState() {
    return systemStates.sport?.shift || null;
}

function getSportReceiptDate(now = new Date()) {
    const shift = getSportShiftState();
    if (!shift?.active || !shift.businessDateKey) return now;
    const [year, month, day] = shift.businessDateKey.split("-").map(Number);
    const shifted = new Date(now);
    shifted.setFullYear(year, month - 1, day);
    return shifted;
}

function renderShiftControls() {
    if (!shiftControls) return;
    if (currentSystem !== "sport") {
        shiftControls.classList.add("hidden");
        return;
    }

    shiftControls.classList.remove("hidden");
    const shift = getSportShiftState();
    const isActive = Boolean(shift?.active);

    if (shiftStatusText) {
        shiftStatusText.textContent = isActive
            ? `Бармен: ${currentBartenderName} • Смена открыта: ${formatDayHeading(shift.businessDateKey)}`
            : (currentBartenderName ? `Бармен: ${currentBartenderName} • Смена не начата` : "Смена не начата");
        shiftStatusText.classList.toggle("shift-active", isActive);
    }

    if (startShiftBtn) startShiftBtn.disabled = isActive;
    if (endShiftBtn) endShiftBtn.disabled = !isActive;
}


async function saveSportShiftToCloud(shift, active = true) {
    if (!shift) return;
    try {
        const { error } = await supabaseClient.from("sport_shift_sessions").upsert([{
            id: shift.id,
            bartender_id: currentBartenderId || getOwnerBartenderIdByName(currentBartenderName),
            bartender_name: currentBartenderName || shift.bartenderName || "Бармен",
            active,
            started_at: shift.startedAtISO,
            ended_at: shift.endedAtISO || null,
            business_date: shift.businessDateKey || null
        }]);
        if (error) {
            console.error("Ошибка сохранения смены в Supabase:", error);
            showToast("Смена сохранена локально, но не попала в базу. Выполните supabase_database_setup.sql", "error", "База");
        }
    } catch (error) {
        console.error("Смена сохранена локально. Для кабинета хозяина в базе создайте sport_shift_sessions:", error);
        showToast("Смена сохранена локально, но не попала в базу.", "error", "База");
    }
}

async function updateSportShiftEndInCloud(shift) {
    if (!shift) return;
    try {
        await supabaseClient
            .from("sport_shift_sessions")
            .update({ active: false, ended_at: shift.endedAtISO || new Date().toISOString() })
            .eq("id", shift.id);
        await supabaseClient
            .from("receipts_history")
            .update({ shift_ended_at: shift.endedAtISO || new Date().toISOString() })
            .eq("shift_id", shift.id);
    } catch (error) {
        console.warn("Не удалось обновить смену в базе:", error);
    }
}

async function startSportShift() {
    if (!currentBartenderName) {
        showSportBartenderLogin();
        return;
    }
    const state = systemStates.sport;
    if (!state) return;
    if (state.shift?.active) {
        showAlert("Смена уже начата.", "Смена");
        return;
    }

    const now = new Date();
    state.shift = {
        id: crypto.randomUUID(),
        active: true,
        startedAtISO: now.toISOString(),
        businessDateKey: getLocalDayKey(now),
        bartenderName: currentBartenderName
    };

    const prevSystem = currentSystem;
    currentSystem = "sport";
    saveCurrentSystemState();
    currentSystem = prevSystem;
    renderShiftControls();
    await saveSportShiftToCloud(state.shift, true);
    showToast(`Смена начата для ${currentBartenderName}. Новые чеки попадут в эту смену.`, "success", "Смена");
}
window.startSportShift = startSportShift;

function endSportShift() {
    const state = systemStates.sport;
    if (!state?.shift?.active) {
        showAlert("Активной смены нет.", "Смена");
        return;
    }

    const activeDate = formatDayHeading(state.shift.businessDateKey);
    showConfirm(`Закончить смену за ${activeDate}? В истории будет видно время начала, время окончания и итог кассы этой смены.`, async () => {
        const endedAtISO = new Date().toISOString();
        const closingShift = { ...state.shift, endedAtISO };
        state.receiptHistory = state.receiptHistory.map(item => {
            if (item.shiftId && item.shiftId === closingShift.id) {
                return { ...item, shiftEndedAtISO: endedAtISO };
            }
            return item;
        });

        await updateSportShiftEndInCloud(closingShift);

        state.shift = null;
        const prevSystem = currentSystem;
        currentSystem = "sport";
        saveCurrentSystemState();
        currentSystem = prevSystem;
        renderShiftControls();
        renderHistory();
        showToast("Смена закрыта. Итог смены доступен в истории чеков.", "success", "Смена");
    }, "Закрытие смены");
}
window.endSportShift = endSportShift;

function normalizeHistoryItem(item) {
    const paymentMethod = normalizePaymentMethod(
        item.paymentMethod ||
        item.payment_method ||
        item.payment_type ||
        inferPaymentMethodFromStatus(item.paymentStatus || item.payment_status)
    );

    return {
        id: item.id || crypto.randomUUID(),
        table: item.table || item.table_name || getTableTitle(item.tableKey || item.table_key || "table1"),
        tableKey: item.tableKey || item.table_key || "table1",
        total: Number(item.total || 0),
        itemsCount: Number(item.itemsCount || item.items_count || 0),
        createdAt: item.createdAt || formatDateTime(item.createdAtISO || item.created_at || new Date().toISOString()),
        createdAtISO: item.createdAtISO || item.created_at || new Date().toISOString(),
        paid: Number(item.paid || 0),
        change: Number(item.change || item.change_amount || 0),
        shortage: Number(item.shortage || 0),
        paymentStatus: item.paymentStatus || item.payment_status || "—",
        paymentMethod,
        paymentMethodLabel: getPaymentMethodLabel(paymentMethod),
        transferNumber: paymentMethod === "card" ? CARD_TRANSFER_NUMBER : "",
        bartenderName: item.bartenderName || item.bartender_name || "",
        shiftId: item.shiftId || item.shift_id || "",
        shiftStartedAtISO: item.shiftStartedAtISO || item.shift_started_at || "",
        shiftEndedAtISO: item.shiftEndedAtISO || item.shift_ended_at || "",
        businessDateKey: item.businessDateKey || item.business_date || "",
        items: Array.isArray(item.items) ? item.items : []
    };
}

function renderCategoryTabs() {
    if (!currentSystem) return;

    const categories = getCurrentMenu();
    const activeCategory = getActiveMenuCategory();
    menuCategories.innerHTML = "";

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.className = `category-tab ${activeCategory === category.category ? "active" : ""}`;
        btn.textContent = category.category;
        btn.onclick = () => {
            setActiveMenuCategory(category.category);
            renderCategoryTabs();
            renderMenu();
        };
        menuCategories.appendChild(btn);
    });
}

function renderMenu() {
    if (!currentSystem) return;

    const searchValue = menuSearch?.value.trim().toLowerCase() || "";
    const menuData = getCurrentMenu();
    const activeCategory = getActiveMenuCategory();
    menuContent.innerHTML = "";

    let categoriesToShow = menuData.filter(x => x.category === activeCategory);

    if (searchValue) {
        categoriesToShow = menuData
            .map(category => ({
                category: category.category,
                items: category.items.filter(item => item.name.toLowerCase().includes(searchValue))
            }))
            .filter(category => category.items.length > 0);
    }

    if (menuCountChip) {
        const totalCount = categoriesToShow.reduce((sum, category) => sum + category.items.length, 0);
        menuCountChip.textContent = `${totalCount} позиций`;
    }

    if (!categoriesToShow.length) {
        menuContent.innerHTML = '<p class="empty-text">Ничего не найдено</p>';
        return;
    }

    categoriesToShow.forEach((category, categoryIndex) => {
        const block = document.createElement("div");
        block.className = "category-block";

        if (searchValue) {
            const title = document.createElement("h3");
            title.className = "service-group-title";
            title.textContent = category.category;
            block.appendChild(title);
        }

        const cards = document.createElement("div");
        cards.className = "cards compact";

        category.items.forEach((item, itemIndex) => {
            const safeId = item.name.replaceAll(" ", "_").replaceAll(".", "_");
            const qtyId = `qty_${currentSystem}_${categoryIndex}_${itemIndex}_${safeId}`;

            const card = document.createElement("article");
            card.className = "item-card glass-inner";
            card.innerHTML = `
                <div class="item-meta">
                    <h3>${escapeHtml(item.name)}</h3>
                    <p>${item.price} лей</p>
                </div>
                <div class="item-actions">
                    <input type="number" min="1" value="1" class="qty-input" id="${qtyId}" />
                    <button class="add-btn" onclick="addMenuItem('${escapeJs(item.name)}', ${item.price}, '${qtyId}', '${escapeJs(item.unit)}')">+</button>
                </div>
                <div class="quick-add-row">
                    <button class="quick-add-btn" onclick="quickAddMenuItem('${escapeJs(item.name)}', ${item.price}, '${escapeJs(item.unit)}', 1)">+1</button>
                    <button class="quick-add-btn" onclick="quickAddMenuItem('${escapeJs(item.name)}', ${item.price}, '${escapeJs(item.unit)}', 2)">+2</button>
                    <button class="quick-add-btn" onclick="quickAddMenuItem('${escapeJs(item.name)}', ${item.price}, '${escapeJs(item.unit)}', 5)">+5</button>
                </div>
                <div class="price-tag">${item.price} лей</div>
            `;
            cards.appendChild(card);
        });

        block.appendChild(cards);
        menuContent.appendChild(block);
    });
}

function renderServices() {
    if (!currentSystem) return;

    if (!SYSTEM_CONFIG[currentSystem].hasServices) {
        servicesContent.innerHTML = '<p class="empty-text">Для Cafe услуги скрыты — здесь только меню.</p>';
        timersList.innerHTML = '<p class="empty-text">Для Cafe таймеры не используются</p>';
        if (timersCount) timersCount.textContent = "0";
        if (servicesCountChip) servicesCountChip.textContent = "0 активных";
        return;
    }

    const state = getState();
    servicesContent.innerHTML = "";
    if (servicesCountChip) servicesCountChip.textContent = `${state.activeTimers.length} активных`;

    SERVICES_DATA.forEach((group, groupIndex) => {
        const block = document.createElement("div");
        block.className = "service-group";

        const title = document.createElement("h3");
        title.className = "service-group-title";
        title.textContent = group.category;
        block.appendChild(title);

        const cards = document.createElement("div");
        cards.className = "services-grid";

        group.services.forEach((service, serviceIndex) => {
            const freeLabelId = `free_service_label_${groupIndex}_${serviceIndex}`;
            const fixedLabelId = `fixed_service_label_${groupIndex}_${serviceIndex}`;
            const fixedHoursId = `fixed_service_hours_${groupIndex}_${serviceIndex}`;

            const card = document.createElement("article");
            card.className = "item-card glass-inner";
            card.innerHTML = `
                <div class="item-meta">
                    <h3>${escapeHtml(service.name)}</h3>
                    <p>${service.pricePerHour} лей / час</p>
                </div>

                <div class="timer-mode-block">
                    <div class="timer-mode-title">Свободное время</div>
                    <div class="service-form">
                        <input type="text" id="${freeLabelId}" placeholder="Имя клиента / комментарий" />
                        <button class="start-btn" onclick="startOpenService('${escapeJs(service.name)}', ${service.pricePerHour}, '${freeLabelId}')">Старт свободного таймера</button>
                    </div>
                </div>

                <div class="timer-mode-block">
                    <div class="timer-mode-title">Фиксированное время</div>
                    <div class="service-form">
                        <input type="text" id="${fixedLabelId}" placeholder="Имя клиента / комментарий" />
                        <input type="hidden" id="${fixedHoursId}" value="1" />
                        <div class="time-picker">
                            <button type="button" class="time-chip active" onclick="setFixedHours('${fixedHoursId}', this)">1ч</button>
                            <button type="button" class="time-chip" onclick="setFixedHours('${fixedHoursId}', this)">2ч</button>
                            <button type="button" class="time-chip" onclick="setFixedHours('${fixedHoursId}', this)">3ч</button>
                            <button type="button" class="time-chip" onclick="setFixedHours('${fixedHoursId}', this)">4ч</button>
                            <button type="button" class="time-chip" onclick="setFixedHours('${fixedHoursId}', this)">5ч</button>
                            <button type="button" class="time-chip" onclick="setFixedHours('${fixedHoursId}', this)">6ч</button>
                        </div>
                        <button class="start-btn" onclick="startFixedService('${escapeJs(service.name)}', ${service.pricePerHour}, '${fixedLabelId}', '${fixedHoursId}')">Старт фиксированного таймера</button>
                    </div>
                </div>
            `;
            cards.appendChild(card);
        });

        block.appendChild(cards);
        servicesContent.appendChild(block);
    });

    renderTimers();
}

function setFixedHours(inputId, button) {
    const value = button.textContent.replace("ч", "").trim();
    const hiddenInput = document.getElementById(inputId);
    if (hiddenInput) hiddenInput.value = value;

    const container = button.closest(".time-picker");
    container?.querySelectorAll(".time-chip").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}
window.setFixedHours = setFixedHours;

function addMenuItem(name, price, qtyInputId, unit) {
    if (!currentSystem) return;
    if (!currentTable) {
        showAlert("Сначала создайте заказ.", "Заказ не выбран");
        return;
    }
    const state = getState();
    const qtyValue = document.getElementById(qtyInputId)?.value;
    const quantity = Math.max(1, parseInt(qtyValue, 10) || 1);

    state.receipts[currentTable].push({
        id: crypto.randomUUID(),
        name,
        details: `${quantity} ${unit} x ${price} лей`,
        total: roundMoney(price * quantity)
    });

    saveCurrentSystemState();
    renderReceipt();
    renderTableStatuses();
}
window.addMenuItem = addMenuItem;

function quickAddMenuItem(name, price, unit, quantity) {
    if (!currentSystem) return;
    if (!currentTable) {
        showAlert("Сначала создайте заказ.", "Заказ не выбран");
        return;
    }
    const state = getState();
    state.receipts[currentTable].push({
        id: crypto.randomUUID(),
        name,
        details: `${quantity} ${unit} x ${price} лей`,
        total: roundMoney(price * quantity)
    });

    saveCurrentSystemState();
    renderReceipt();
    renderTableStatuses();
}
window.quickAddMenuItem = quickAddMenuItem;

function clearReceipt() {
    if (!currentSystem || !currentTable) return;
    showConfirm(`Очистить чек для ${getTableTitle(currentTable)}?`, () => {
        const state = getState();
        state.receipts[currentTable] = [];
        state.paidAmounts[currentTable] = "";
        state.paymentMethods[currentTable] = "cash";

        if (paidAmountInput) paidAmountInput.value = "";
        saveCurrentSystemState();
        renderPaymentMethodControls();
        renderReceipt();
        renderPaymentInfo();
        renderTableStatuses();
    });
}
window.clearReceipt = clearReceipt;

function deleteCurrentOrder() {
    if (!currentSystem || !currentTable || !isCafeOrderKey(currentTable)) {
        showAlert("Сначала выберите заказ.", "Удаление заказа");
        return;
    }

    const state = getState();
    const receipt = state.receipts[currentTable] || [];
    const message = receipt.length
        ? `Удалить ${getTableTitle(currentTable)} вместе с позициями в чеке?`
        : `Удалить пустой ${getTableTitle(currentTable)}?`;

    showConfirm(message, () => {
        delete state.receipts[currentTable];
        delete state.paidAmounts[currentTable];
        delete state.paymentMethods[currentTable];

        currentTable = getCafeOrderKeys(state)[0] || null;
        if (paidAmountInput) paidAmountInput.value = currentTable ? (state.paidAmounts[currentTable] || "") : "";

        saveCurrentSystemState();
        renderTablesSwitch();
        updateCurrentTableBadge();
        renderPaymentMethodControls();
        renderReceipt();
        renderPaymentInfo();
        renderTableStatuses();
        showToast("Заказ удалён.", "success", "Готово");
    }, "Удаление заказа");
}
window.deleteCurrentOrder = deleteCurrentOrder;

async function closeCurrentReceipt() {
    if (!currentSystem || !currentTable) return;
    const state = getState();
    const currentReceipt = state.receipts[currentTable];

    if (currentSystem === "sport" && !currentBartenderName) {
        showSportBartenderLogin();
        return;
    }

    if (currentSystem === "sport" && !state.shift?.active) {
        showAlert("Сначала нажмите «Начать смену». После этого чеки Sport Bar будут сохраняться в эту смену.", "Смена не начата");
        return;
    }

    if (!currentReceipt.length) {
        showAlert("Чек пустой.", "Ошибка");
        return;
    }

    showConfirm(`Закрыть чек для ${getTableTitle(currentTable)}?`, async () => {
        const total = getReceiptTotal(currentTable);
        const paid = Number(state.paidAmounts[currentTable] || 0);
        const change = Math.max(0, roundMoney(paid - total));
        const shortage = paid > 0 && paid < total ? roundMoney(total - paid) : 0;
        const paymentMethod = normalizePaymentMethod(state.paymentMethods[currentTable]);
        const now = currentSystem === "sport" ? getSportReceiptDate(new Date()) : new Date();
        const historyTable =
    currentSystem === "cafe"
        ? "cafe_receipts_history"
        : "receipts_history";

        const activeShift = currentSystem === "sport" ? state.shift : null;
        const closedReceipt = normalizeHistoryItem({
            id: crypto.randomUUID(),
            table: getTableTitle(currentTable),
            tableKey: currentTable,
            total,
            itemsCount: currentReceipt.length,
            createdAt: now.toLocaleString("ru-RU"),
            createdAtISO: now.toISOString(),
            paid,
            change,
            shortage,
            paymentStatus: paid <= 0 ? (total > 0 ? "Ожидание оплаты" : "Чек пуст") : paid >= total ? "Оплачено" : `Не хватает ${formatMoney(shortage)} лей`,
            paymentMethod,
            bartenderName: currentSystem === "sport" ? currentBartenderName : "",
            shiftId: activeShift?.id || "",
            shiftStartedAtISO: activeShift?.startedAtISO || "",
            shiftEndedAtISO: activeShift?.endedAtISO || "",
            businessDateKey: activeShift?.businessDateKey || "",
            items: currentReceipt.map(item => ({ ...item }))
        });

        if (SYSTEM_CONFIG[currentSystem].cloudHistory) {
            const savedToCloud = await insertReceiptToCloud(historyTable, closedReceipt);
            if (!savedToCloud) return;
        }

        state.receiptHistory.unshift(closedReceipt);

        if (currentSystem === "cafe" || (currentSystem === "sport" && isCafeOrderKey(currentTable))) {
            delete state.receipts[currentTable];
            delete state.paidAmounts[currentTable];
            delete state.paymentMethods[currentTable];
            currentTable = getCafeOrderKeys(state)[0] || null;
        } else {
            state.receipts[currentTable] = [];
            state.paidAmounts[currentTable] = "";
            state.paymentMethods[currentTable] = "cash";
        }

        if (paidAmountInput) paidAmountInput.value = currentTable ? (state.paidAmounts[currentTable] || "") : "";
        saveCurrentSystemState();
        renderTablesSwitch();
        updateCurrentTableBadge();
        renderPaymentMethodControls();
        renderReceipt();
        renderPaymentInfo();
        renderTableStatuses();
        if (currentSystem === "sport") renderBartenderProfile();
    });
}
window.closeCurrentReceipt = closeCurrentReceipt;

function removeReceiptItem(id) {
    if (!currentSystem) return;
    const state = getState();
    state.receipts[currentTable] = state.receipts[currentTable].filter(x => x.id !== id);
    saveCurrentSystemState();
    renderReceipt();
    renderPaymentInfo();
    renderTableStatuses();
}
window.removeReceiptItem = removeReceiptItem;

function renderReceipt() {
    if (!currentSystem) return;
    const state = getState();
    if (deleteOrderBtn) {
        deleteOrderBtn.classList.toggle("hidden", !(currentTable && isCafeOrderKey(currentTable)));
    }

    if (!currentTable) {
        receiptItems.innerHTML = (currentSystem === "cafe" || currentSystem === "sport")
            ? '<p class="empty-text">Нажмите "Создать заказ +" чтобы начать новый чек</p>'
            : '<p class="empty-text">Пока ничего не добавлено</p>';
        totalPrice.textContent = '0 лей';
        renderPaymentInfo();
        return;
    }

    const currentReceipt = state.receipts[currentTable] || [];

    if (!currentReceipt.length) {
        receiptItems.innerHTML = '<p class="empty-text">Пока ничего не добавлено</p>';
        totalPrice.textContent = '0 лей';
        renderPaymentInfo();
        return;
    }

    receiptItems.innerHTML = "";
    let total = 0;

    currentReceipt.forEach(item => {
        total += item.total;
        const el = document.createElement("div");
        el.className = "receipt-item";
        el.innerHTML = `
            <div>
                <h4>${escapeHtml(item.name)}</h4>
                <p>${escapeHtml(item.details)}</p>
            </div>
            <div style="display:flex; flex-direction:column; gap:8px; align-items:flex-end;">
                <div class="receipt-price">${formatMoney(item.total)} лей</div>
                <button class="small-btn" onclick="removeReceiptItem('${item.id}')">Удалить</button>
            </div>
        `;
        receiptItems.appendChild(el);
    });

    totalPrice.textContent = `${formatMoney(total)} лей`;
    renderPaymentInfo();
}

function renderPaymentMethodControls() {
    if (!currentSystem) return;

    const state = getState();
    const method = normalizePaymentMethod(
        currentTable && state.paymentMethods[currentTable]
            ? state.paymentMethods[currentTable]
            : "cash"
    );

    if (paymentMethodCash) {
        paymentMethodCash.checked = method === "cash";
    }

    if (paymentMethodCard) {
        paymentMethodCard.checked = method === "card";
    }

    if (cardTransferNumber) {
        cardTransferNumber.textContent = CARD_TRANSFER_NUMBER;
    }

    if (cardTransferInfo) {
        cardTransferInfo.classList.toggle("hidden", method !== "card");
    }

    if (paymentCashOnly) {
        paymentCashOnly.classList.toggle("hidden", method === "card");
    }
}

function setPaymentMethod(method) {
    if (!currentSystem) return;

    if (!currentTable) {
        showAlert("Сначала создайте заказ.", "Заказ не выбран");
        if (paymentMethodCash) paymentMethodCash.checked = true;
        if (paymentMethodCard) paymentMethodCard.checked = false;
        return;
    }

    const normalized = normalizePaymentMethod(method);
    getState().paymentMethods[currentTable] = normalized;

    saveCurrentSystemState();
    renderPaymentMethodControls();
    renderPaymentInfo();
}

function handlePaidAmountInput() {
    if (!currentSystem || !currentTable) return;
    getState().paidAmounts[currentTable] = paidAmountInput.value || "";
    saveCurrentSystemState();
    renderPaymentInfo();
    renderTableStatuses();
}

function fillExactPaid() {
    if (!currentSystem || !currentTable) return;
    const total = getReceiptTotal(currentTable);
    if (paidAmountInput) paidAmountInput.value = total;
    handlePaidAmountInput();
}
window.fillExactPaid = fillExactPaid;

function changePaid(amount) {
    if (!currentSystem || !currentTable) return;
    let value = Number(paidAmountInput?.value) || 0;
    value += amount;
    if (value < 0) value = 0;
    if (paidAmountInput) paidAmountInput.value = value;
    handlePaidAmountInput();
}
window.changePaid = changePaid;

function renderPaymentInfo() {
    if (!currentSystem) return;
    const state = getState();
    const total = currentTable ? getReceiptTotal(currentTable) : 0;
    const paid = currentTable ? Number(state.paidAmounts[currentTable] || 0) : 0;
    const method = normalizePaymentMethod(currentTable ? state.paymentMethods[currentTable] : "cash");

    if (paymentTotal) paymentTotal.textContent = `${formatMoney(total)} лей`;
    changeAmount?.classList.remove("payment-ok", "payment-warn", "payment-neutral");
    paymentStatus?.classList.remove("payment-ok", "payment-warn", "payment-neutral");

    if (!paid || paid <= 0) {
        if (changeAmount) {
            changeAmount.textContent = "0 лей";
            changeAmount.classList.add("payment-neutral");
        }
        if (paymentStatus) {
            paymentStatus.textContent = total > 0 ? `Ожидание оплаты • ${getPaymentMethodLabel(method)}` : "Чек пуст";
            paymentStatus.classList.add("payment-neutral");
        }
        return;
    }

    const diff = roundMoney(paid - total);
    if (diff >= 0) {
        if (changeAmount) {
            changeAmount.textContent = `${formatMoney(diff)} лей`;
            changeAmount.classList.add("payment-ok");
        }
        if (paymentStatus) {
            paymentStatus.textContent = `Оплачено • ${getPaymentMethodLabel(method)}`;
            paymentStatus.classList.add("payment-ok");
        }
    } else {
        if (changeAmount) {
            changeAmount.textContent = "0 лей";
            changeAmount.classList.add("payment-neutral");
        }
        if (paymentStatus) {
            paymentStatus.textContent = `Не хватает ${formatMoney(Math.abs(diff))} лей • ${getPaymentMethodLabel(method)}`;
            paymentStatus.classList.add("payment-warn");
        }
    }
}

function renderTableStatuses() {
    if (!currentSystem) return;
    const state = getState();
    const tableButtons = document.querySelectorAll(".table-btn[data-table-key]");

    tableButtons.forEach(btn => {
        const key = btn.dataset.tableKey;
        btn.classList.remove("table-status-empty", "table-status-receipt", "table-status-timer", "table-status-paid");

        const hasReceipt = (state.receipts[key] || []).length > 0;
        const hasTimer = state.activeTimers.some(timer => timer.tableKey === key);
        const total = getReceiptTotal(key);
        const paid = Number(state.paidAmounts[key] || 0);
        const isPaid = total > 0 && paid >= total;

        if (hasTimer) btn.classList.add("table-status-timer");
        else if (isPaid) btn.classList.add("table-status-paid");
        else if (hasReceipt) btn.classList.add("table-status-receipt");
        else btn.classList.add("table-status-empty");
    });
}

function startOpenService(serviceName, pricePerHour, labelInputId) {
    if (!currentSystem || !SYSTEM_CONFIG[currentSystem].hasServices) return;
    if (!currentTable) {
        showAlert("Сначала создайте заказ.", "Заказ не выбран");
        return;
    }
    const state = getState();
    const labelValue = document.getElementById(labelInputId)?.value.trim() || "Без названия";

    state.activeTimers.push({
        id: crypto.randomUUID(),
        tableKey: currentTable,
        type: "open",
        serviceName,
        label: labelValue,
        pricePerHour,
        startTime: Date.now(),
        paused: false,
        pausedAt: null,
        pausedMs: 0
    });

    saveCurrentSystemState();
    renderTimers();
    renderTableStatuses();
}
window.startOpenService = startOpenService;

function startFixedService(serviceName, pricePerHour, labelInputId, hoursInputId) {
    if (!currentSystem || !SYSTEM_CONFIG[currentSystem].hasServices) return;
    if (!currentTable) {
        showAlert("Сначала создайте заказ.", "Заказ не выбран");
        return;
    }
    const state = getState();
    const labelValue = document.getElementById(labelInputId)?.value.trim() || "Без названия";
    const hours = Math.max(1, parseInt(document.getElementById(hoursInputId)?.value, 10) || 1);
    const now = Date.now();

    state.activeTimers.push({
        id: crypto.randomUUID(),
        tableKey: currentTable,
        type: "fixed",
        serviceName,
        label: labelValue,
        pricePerHour,
        selectedHours: hours,
        startTime: now,
        endTime: now + hours * 60 * 60 * 1000,
        addedToReceipt: false,
        paused: false,
        pausedAt: null,
        pausedMs: 0
    });

    saveCurrentSystemState();
    renderTimers();
    renderTableStatuses();
}
window.startFixedService = startFixedService;

function pauseTimer(id) {
    const state = getState();
    const timer = state?.activeTimers.find(x => x.id === id);
    if (!timer || timer.paused) return;
    timer.paused = true;
    timer.pausedAt = Date.now();
    saveCurrentSystemState();
    renderTimers();
}
window.pauseTimer = pauseTimer;

function resumeTimer(id) {
    const state = getState();
    const timer = state?.activeTimers.find(x => x.id === id);
    if (!timer || !timer.paused) return;

    const pausedDuration = Date.now() - timer.pausedAt;
    timer.pausedMs += pausedDuration;
    if (timer.type === "fixed") timer.endTime += pausedDuration;
    timer.paused = false;
    timer.pausedAt = null;

    saveCurrentSystemState();
    renderTimers();
}
window.resumeTimer = resumeTimer;

function extendTimer(id, minutes) {
    const state = getState();
    const timer = state?.activeTimers.find(x => x.id === id);
    if (!timer || timer.type !== "fixed") return;

    timer.endTime += minutes * 60 * 1000;
    timer.selectedHours = roundToOneDecimal((timer.endTime - timer.startTime - (timer.pausedMs || 0)) / 3600000);
    saveCurrentSystemState();
    renderTimers();
}
window.extendTimer = extendTimer;

function finishOpenService(id) {
    const state = getState();
    const timer = state?.activeTimers.find(x => x.id === id);
    if (!timer) return;

    const elapsedMs = getElapsedMs(timer);
    const total = calculateOpenServicePrice(timer.pricePerHour, elapsedMs);
    state.receipts[timer.tableKey].push({
        id: crypto.randomUUID(),
        name: timer.serviceName,
        details: `${timer.label} • ${formatElapsedForReceipt(elapsedMs)} • ${timer.pricePerHour} лей/час`,
        total
    });
    state.activeTimers = state.activeTimers.filter(x => x.id !== id);
    saveCurrentSystemState();
    renderTimers();
    renderReceipt();
    renderTableStatuses();
}
window.finishOpenService = finishOpenService;

function finishFixedServiceEarly(id) {
    const state = getState();
    const timer = state?.activeTimers.find(x => x.id === id);
    if (!timer) return;

    state.receipts[timer.tableKey].push({
        id: crypto.randomUUID(),
        name: timer.serviceName,
        details: `${timer.label} • ${timer.selectedHours} ч • завершено раньше`,
        total: roundMoney(timer.selectedHours * timer.pricePerHour)
    });
    state.activeTimers = state.activeTimers.filter(x => x.id !== id);
    saveCurrentSystemState();
    renderTimers();
    renderReceipt();
    renderTableStatuses();
}
window.finishFixedServiceEarly = finishFixedServiceEarly;

function renderTimers() {
    if (!currentSystem) return;
    const state = getState();

    if (!SYSTEM_CONFIG[currentSystem].hasServices) {
        if (timersCount) timersCount.textContent = "0";
        return;
    }

    if (timersCount) timersCount.textContent = state.activeTimers.length;
    if (servicesCountChip) servicesCountChip.textContent = `${state.activeTimers.length} активных`;

    if (!state.activeTimers.length) {
        timersList.innerHTML = '<p class="empty-text">Пока нет активных услуг</p>';
        return;
    }

    timersList.innerHTML = "";
    state.activeTimers.forEach(timer => {
        const card = document.createElement("div");
        card.className = "timer-card";
        const tableText = getTableTitle(timer.tableKey);

        if (timer.type === "open") {
            const elapsedMs = getElapsedMs(timer);
            const currentPrice = calculateOpenServicePrice(timer.pricePerHour, elapsedMs);
            card.classList.add("timer-status-ok");
            card.innerHTML = `
                <div class="timer-top">
                    <div>
                        <div class="timer-title">${escapeHtml(timer.serviceName)}</div>
                        <div class="timer-sub">${escapeHtml(timer.label)} • ${tableText} • Свободный таймер${timer.paused ? " • Пауза" : ""}</div>
                    </div>
                    <button class="small-btn" onclick="finishOpenService('${timer.id}')">Завершить</button>
                </div>
                <div class="timer-time">${formatTime(elapsedMs)}</div>
                <div class="timer-money">Сейчас: ${formatMoney(currentPrice)} лей</div>
                <div class="timer-actions">
                    ${timer.paused
                        ? `<button class="small-btn" onclick="resumeTimer('${timer.id}')">Продолжить</button>`
                        : `<button class="small-btn" onclick="pauseTimer('${timer.id}')">Пауза</button>`}
                </div>
            `;
        } else {
            const remainingMs = Math.max(0, getRemainingMs(timer));
            const passedMs = getElapsedMs(timer);
            const totalFixedPrice = roundMoney(timer.selectedHours * timer.pricePerHour);

            if (remainingMs <= 60000) card.classList.add("timer-status-danger");
            else if (remainingMs <= 300000) card.classList.add("timer-status-warn");
            else card.classList.add("timer-status-ok");

            card.innerHTML = `
                <div class="timer-top">
                    <div>
                        <div class="timer-title">${escapeHtml(timer.serviceName)}</div>
                        <div class="timer-sub">${escapeHtml(timer.label)} • ${tableText} • ${timer.selectedHours} ч • Фиксированный таймер${timer.paused ? " • Пауза" : ""}</div>
                    </div>
                    <button class="small-btn" onclick="finishFixedServiceEarly('${timer.id}')">Завершить раньше</button>
                </div>
                <div class="timer-time">Осталось: ${formatTime(remainingMs)}</div>
                <div class="timer-sub" style="margin-top:8px;">Прошло: ${formatTime(passedMs)}</div>
                <div class="timer-money">К оплате: ${formatMoney(totalFixedPrice)} лей</div>
                <div class="timer-actions">
                    ${timer.paused
                        ? `<button class="small-btn" onclick="resumeTimer('${timer.id}')">Продолжить</button>`
                        : `<button class="small-btn" onclick="pauseTimer('${timer.id}')">Пауза</button>`}
                    <button class="small-btn" onclick="extendTimer('${timer.id}', 30)">+30 мин</button>
                    <button class="small-btn" onclick="extendTimer('${timer.id}', 60)">+1 час</button>
                </div>
            `;
        }

        timersList.appendChild(card);
    });
}

function startGlobalTimerLoop() {
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        ["sport", "cafe"].forEach(systemKey => autoFinishFixedTimers(systemKey));
        if (currentSystem) renderTimers();
    }, 1000);
}

function autoFinishFixedTimers(systemKey) {
    if (!SYSTEM_CONFIG[systemKey].hasServices) return;
    const state = systemStates[systemKey];
    let changed = false;

    state.activeTimers.forEach(timer => {
        if (timer.type === "fixed" && !timer.paused && !timer.addedToReceipt && Date.now() >= timer.endTime) {
            state.receipts[timer.tableKey].push({
                id: crypto.randomUUID(),
                name: timer.serviceName,
                details: `${timer.label} • ${timer.selectedHours} ч • фиксированный таймер`,
                total: roundMoney(timer.selectedHours * timer.pricePerHour)
            });
            timer.addedToReceipt = true;
            changed = true;
        }
    });

    const oldLength = state.activeTimers.length;
    state.activeTimers = state.activeTimers.filter(timer => !(timer.type === "fixed" && timer.addedToReceipt));
    if (changed || oldLength !== state.activeTimers.length) {
        const prevSystem = currentSystem;
        currentSystem = systemKey;
        saveCurrentSystemState();
        currentSystem = prevSystem;
        if (prevSystem === systemKey) {
            renderReceipt();
            renderTableStatuses();
        }
    }
}

function getElapsedMs(timer) {
    const now = timer.paused ? timer.pausedAt : Date.now();
    return Math.max(0, now - timer.startTime - (timer.pausedMs || 0));
}

function getRemainingMs(timer) {
    const now = timer.paused ? timer.pausedAt : Date.now();
    return timer.endTime - now;
}

function calculateOpenServicePrice(pricePerHour, elapsedMs) {
    return roundMoney((pricePerHour / 60) * (elapsedMs / 60000));
}

function getReceiptTotal(tableKey = currentTable) {
    if (!currentSystem || !tableKey) return 0;
    return roundMoney((getState().receipts[tableKey] || []).reduce((sum, item) => sum + Number(item.total || 0), 0));
}

function showAlert(message, title = "Сообщение") {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalCancelBtn.style.display = "none";
    modalOkBtn.textContent = "ОК";
    modalOverlay.classList.remove("hidden");

    const close = () => {
        modalOverlay.classList.add("hidden");
        modalOkBtn.removeEventListener("click", close);
    };

    modalOkBtn.addEventListener("click", close);
}

function showConfirm(message, onConfirm, title = "Подтверждение") {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modalCancelBtn.style.display = "inline-flex";
    modalOkBtn.textContent = "Подтвердить";
    modalOverlay.classList.remove("hidden");

    const close = () => {
        modalOverlay.classList.add("hidden");
        modalOkBtn.removeEventListener("click", confirmHandler);
        modalCancelBtn.removeEventListener("click", cancelHandler);
    };

    const confirmHandler = () => {
        close();
        if (typeof onConfirm === "function") onConfirm();
    };
    const cancelHandler = () => close();

    modalOkBtn.addEventListener("click", confirmHandler);
    modalCancelBtn.addEventListener("click", cancelHandler);
}

function showToast(message, type = "info", title = "") {
    if (!toastContainer) return;
    const safeType = ["success", "error", "warning", "info"].includes(type) ? type : "info";
    const toast = document.createElement("div");
    toast.className = `toast toast-${safeType}`;
    const resolvedTitle = title || (safeType === "success" ? "Успешно" : safeType === "error" ? "Ошибка" : safeType === "warning" ? "Внимание" : "Сообщение");
    const duration = safeType === "error" ? 4200 : safeType === "warning" ? 3800 : 3000;

    toast.innerHTML = `
        <div class="toast-header">
            <div class="toast-title">${escapeHtml(resolvedTitle)}</div>
            <button class="toast-close" type="button" aria-label="Закрыть">×</button>
        </div>
        <div class="toast-message">${escapeHtml(message)}</div>
        <div class="toast-progress" style="animation-duration:${duration}ms;"></div>
    `;

    const removeToast = () => {
        if (!toast.parentNode) return;
        toast.classList.add("toast-removing");
        setTimeout(() => toast.remove(), 240);
    };

    toast.querySelector(".toast-close")?.addEventListener("click", removeToast);
    toastContainer.appendChild(toast);
    setTimeout(removeToast, duration);
}

async function openHistoryModal() {
    if (!currentSystem) return;
    await loadHistoryForCurrentSystem();
    historyModalOverlay.classList.remove("hidden");
    document.body.classList.add("history-modal-open");
    document.documentElement.classList.add("history-modal-open");
}
window.openHistoryModal = openHistoryModal;

function closeHistoryModal() {
    historyModalOverlay.classList.add("hidden");
    document.body.classList.remove("history-modal-open");
    document.documentElement.classList.remove("history-modal-open");
}
window.closeHistoryModal = closeHistoryModal;

async function loadHistoryForCurrentSystem() {
    if (!currentSystem) return;
    updateHistoryMonthTitle();

    const historyTable =
    currentSystem === "cafe"
        ? "cafe_receipts_history"
        : "receipts_history";

    if (SYSTEM_CONFIG[currentSystem].cloudHistory) {
        const year = historyViewDate.getFullYear();
        const month = historyViewDate.getMonth();
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 1);
        let query = supabaseClient
            .from(historyTable)
            .select("*")
            .gte("created_at", start.toISOString())
            .lt("created_at", end.toISOString());

        if (currentSystem === "sport" && currentBartenderName) {
            query = query.eq("bartender_name", currentBartenderName);
        }

        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) {
            console.error("Ошибка загрузки истории:", error);
            showToast("Не удалось загрузить историю", "error", "Ошибка");
            return;
        }

        systemStates[currentSystem].receiptHistory = (data || [])
            .map(item => normalizeHistoryItem(item))
            .filter(item => currentSystem !== "sport" || item.bartenderName === currentBartenderName);
        saveCurrentSystemState();
    }

    historySelectedDayKey = null;
    renderHistory();
}

function getHistoryForVisibleMonth() {
    if (!currentSystem) return [];
    const state = getState();
    const month = historyViewDate.getMonth();
    const year = historyViewDate.getFullYear();

    return filterDeletedSportReceipts(state.receiptHistory).filter(item => {
        const date = new Date(item.createdAtISO || item.createdAt);
        return !Number.isNaN(date.getTime()) && date.getMonth() === month && date.getFullYear() === year;
    }).sort((a, b) => String(b.createdAtISO).localeCompare(String(a.createdAtISO)));
}

function renderHistory() {
    const visibleHistory = getHistoryForVisibleMonth();
    let groupedByDay = groupHistoryByDay(visibleHistory);

    if (currentSystem === "sport") {
        groupedByDay = addActiveSportShiftGroup(groupedByDay);
    }

    if (!groupedByDay.length) {
        historySelectedDayKey = null;
        updateHistoryDayTitle([]);
        updateHistoryDayButtons([]);
        historyModalList.innerHTML = currentSystem === "sport"
            ? '<p class="empty-text">История пока пустая. Когда бармен начнет смену и закроет первый чек, здесь появится текущая смена.</p>'
            : '<p class="empty-text">История пока пустая</p>';
        return;
    }

    ensureSelectedHistoryDay(groupedByDay);
    updateHistoryDayTitle(groupedByDay);
    updateHistoryDayButtons(groupedByDay);

    const selectedGroup = groupedByDay.find(group => group.key === historySelectedDayKey);
    if (!selectedGroup) {
        historyModalList.innerHTML = '<p class="empty-text">Нет чеков за выбранную смену</p>';
        return;
    }

    historyModalList.innerHTML = "";

    if (currentSystem === "sport") {
        const selector = renderSportShiftSelector(groupedByDay, selectedGroup);
        historyModalList.appendChild(selector);
    }

    const daySection = document.createElement("section");
    daySection.className = "history-day-group";

    const dayHeader = document.createElement("div");
    dayHeader.className = "history-shift-card glass-inner";
    const isSportShift = currentSystem === "sport" && selectedGroup.shiftId;
    const shiftTimeHtml = isSportShift
        ? `<div>Начало смены: <strong>${escapeHtml(formatDateTime(selectedGroup.startedAtISO))}</strong></div>
           <div>Окончание смены: <strong>${selectedGroup.endedAtISO ? escapeHtml(formatDateTime(selectedGroup.endedAtISO)) : "Смена сейчас открыта"}</strong></div>
           <div>Итог смены: <strong>${formatMoney(selectedGroup.total)} лей</strong></div>`
        : `<div>Касса за день: <strong>${formatMoney(selectedGroup.total)} лей</strong></div>`;
    dayHeader.innerHTML = `
        <div class="history-shift-card-title">
            ${isSportShift ? `<span class="history-shift-date-big">${escapeHtml(getShiftRangeLabel(selectedGroup))}</span>` : ""}
            <span>${escapeHtml(getShiftFullLabel(selectedGroup))}</span>
            ${selectedGroup.active ? '<small>Текущая смена в процессе</small>' : '<small>Закрытая смена</small>'}
        </div>
        <div class="history-day-summary">
            ${shiftTimeHtml}
            <div>Чеков: <strong>${selectedGroup.receipts.length}</strong></div>
            <div>Наличные: <strong>${formatMoney(selectedGroup.cashTotal)} лей</strong></div>
            <div>Карта: <strong>${formatMoney(selectedGroup.cardTotal)} лей</strong></div>
        </div>
    `;
    daySection.appendChild(dayHeader);

    if (!selectedGroup.receipts.length) {
        const empty = document.createElement("p");
        empty.className = "empty-text";
        empty.textContent = selectedGroup.active
            ? "В этой открытой смене пока нет закрытых чеков. Закрытые чеки появятся здесь сразу."
            : "В этой смене чеков нет.";
        daySection.appendChild(empty);
    }

    selectedGroup.receipts.forEach(item => {
        const itemsHtml = (item.items || []).length
            ? item.items.map(receiptItem => `
                <div class="history-detail-item">
                    <div class="history-detail-item-top">
                        <div class="history-detail-item-name">${escapeHtml(receiptItem.name)}</div>
                        <div class="history-detail-item-sum">${formatMoney(receiptItem.total)} лей</div>
                    </div>
                    <div class="history-detail-item-sub">${escapeHtml(receiptItem.details || "Без деталей")}</div>
                </div>
            `).join("")
            : '<p class="empty-text">Позиции не найдены</p>';

        const el = document.createElement("div");
        el.className = "history-item";
        el.innerHTML = `
            <div class="history-item-summary">
                <div class="history-item-top">
                    <div class="history-item-title">${escapeHtml(item.table)}</div>
                    <div class="history-item-time">${escapeHtml(formatOnlyTime(item.realClosedAtISO || item.closedAtISO || item.createdAtISO || item.createdAt))}</div>
                </div>
                <div class="history-item-sub">${item.itemsCount} поз. • ${formatMoney(item.total)} лей • ${escapeHtml(item.paymentMethodLabel || "Оплата наличными")}</div>
            </div>
            <div class="history-item-details hidden">
                <div class="history-detail-grid">
                    <div class="history-detail-row"><span class="history-detail-label">Стол</span><span class="history-detail-value">${escapeHtml(item.table)}</span></div>
                    ${item.bartenderName ? `<div class="history-detail-row"><span class="history-detail-label">Бармен</span><span class="history-detail-value">${escapeHtml(item.bartenderName)}</span></div>` : ""}
                    <div class="history-detail-row"><span class="history-detail-label">Дата</span><span class="history-detail-value">${escapeHtml(formatDateTime(item.realClosedAtISO || item.closedAtISO || item.createdAtISO || item.createdAt))}</span></div>
                    <div class="history-detail-row"><span class="history-detail-label">Способ оплаты</span><span class="history-detail-value">${escapeHtml(item.paymentMethodLabel || "Оплата наличными")}</span></div>
                    ${normalizePaymentMethod(item.paymentMethod) === "card" ? `<div class="history-detail-row"><span class="history-detail-label">Номер перевода</span><span class="history-detail-value">${escapeHtml(item.transferNumber || CARD_TRANSFER_NUMBER)}</span></div>` : ""}
                    <div class="history-detail-row"><span class="history-detail-label">Статус оплаты</span><span class="history-detail-value">${escapeHtml(item.paymentStatus || "—")}</span></div>
                    <div class="history-detail-row"><span class="history-detail-label">Сумма чека</span><span class="history-detail-value">${formatMoney(item.total)} лей</span></div>
                    <div class="history-detail-row"><span class="history-detail-label">Получено от клиента</span><span class="history-detail-value">${formatMoney(item.paid || 0)} лей</span></div>
                    <div class="history-detail-row"><span class="history-detail-label">Сдача</span><span class="history-detail-value">${formatMoney(item.change || 0)} лей</span></div>
                    <div class="history-detail-row"><span class="history-detail-label">Недостача</span><span class="history-detail-value">${formatMoney(item.shortage || 0)} лей</span></div>
                </div>
                <div class="history-detail-items-title">Состав чека</div>
                <div class="history-detail-items">${itemsHtml}</div>
                <button class="danger-btn history-delete-one-btn" onclick="event.stopPropagation(); deleteHistoryReceipt('${item.id}')">Удалить чек</button>
            </div>
        `;

        const summary = el.querySelector(".history-item-summary");
        const details = el.querySelector(".history-item-details");
        summary.onclick = () => {
            const isHidden = details.classList.contains("hidden");
            details.classList.toggle("hidden", !isHidden);
            el.classList.toggle("expanded", isHidden);
        };

        daySection.appendChild(el);
    });

    historyModalList.appendChild(daySection);
    if (currentSystem === "sport") renderBartenderProfile();
}

function renderSportShiftSelector(groups, selectedGroup) {
    const wrapper = document.createElement("div");
    wrapper.className = "history-shift-selector glass-inner";

    const activeGroups = groups.filter(group => group.active);
    const closedGroups = groups.filter(group => !group.active);

    const title = document.createElement("div");
    title.className = "history-shift-selector-title";
    title.textContent = activeGroups.length ? "Открытая смена" : "Закрытые смены";
    wrapper.appendChild(title);

    if (activeGroups.length) {
        activeGroups.forEach(group => wrapper.appendChild(createHistoryShiftButton(group, selectedGroup, true)));
    }

    if (closedGroups.length) {
        const closedTitle = document.createElement("div");
        closedTitle.className = "history-shift-selector-title closed";
        closedTitle.textContent = "Закрытые смены";
        wrapper.appendChild(closedTitle);

        const buttons = document.createElement("div");
        buttons.className = "history-shift-buttons";
        closedGroups.forEach(group => buttons.appendChild(createHistoryShiftButton(group, selectedGroup, false)));
        wrapper.appendChild(buttons);
    } else if (!activeGroups.length) {
        const empty = document.createElement("p");
        empty.className = "empty-text";
        empty.textContent = "Пока нет закрытых смен. После нажатия \"Закончить смену\" здесь появится кнопка с датами, например 24-25.";
        wrapper.appendChild(empty);
    }

    return wrapper;
}

function createHistoryShiftButton(group, selectedGroup, isActiveShift) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `history-shift-btn ${selectedGroup?.key === group.key ? "active" : ""} ${isActiveShift ? "current" : ""}`;
    btn.innerHTML = `
        <strong>${escapeHtml(isActiveShift ? "Текущая" : getShiftRangeLabel(group))}</strong>
        <span>${escapeHtml(group.bartenderName || currentBartenderName || "Бармен")}</span>
        <small>${group.receipts.length} чек. • ${formatMoney(group.total)} лей</small>
    `;
    btn.onclick = () => {
        historySelectedDayKey = group.key;
        renderHistory();
    };
    return btn;
}

function addActiveSportShiftGroup(groups) {
    const shift = getSportShiftState();
    if (!shift?.active || shift.bartenderName !== currentBartenderName) return groups;

    const alreadyExists = groups.some(group => group.shiftId === shift.id);
    if (alreadyExists) {
        return groups.map(group => group.shiftId === shift.id ? { ...group, active: true, endedAtISO: "" } : group);
    }

    const shiftMonth = new Date(shift.startedAtISO);
    if (shiftMonth.getMonth() !== historyViewDate.getMonth() || shiftMonth.getFullYear() !== historyViewDate.getFullYear()) {
        return groups;
    }

    return [{
        key: `${shift.businessDateKey}_${shift.id}`,
        dayKey: shift.businessDateKey,
        shiftId: shift.id,
        bartenderName: shift.bartenderName || currentBartenderName,
        startedAtISO: shift.startedAtISO,
        endedAtISO: "",
        lastReceiptAtISO: shift.startedAtISO,
        label: `Смена ${shift.bartenderName || currentBartenderName}`,
        active: true,
        total: 0,
        cashTotal: 0,
        cardTotal: 0,
        receipts: []
    }, ...groups];
}

function groupHistoryByDay(history) {
    const map = new Map();
    history.forEach(item => {
        const dayKey = item.businessDateKey || getDayKey(item.createdAtISO || item.createdAt);
        const shiftKey = currentSystem === "sport" && item.shiftId ? item.shiftId : dayKey;
        const groupKey = currentSystem === "sport" ? `${dayKey}_${shiftKey}` : dayKey;
        const startedAt = item.shiftStartedAtISO || item.createdAtISO || item.createdAt;
        const endedAt = item.shiftEndedAtISO || "";
        const label = currentSystem === "sport" && item.shiftId
            ? `Смена ${item.bartenderName || currentBartenderName || "бармена"} • ${formatDayHeading(dayKey)}`
            : formatDayHeading(dayKey);
        const receiptTime = item.realClosedAtISO || item.closedAtISO || item.createdAtISO || item.createdAt;

        if (!map.has(groupKey)) {
            map.set(groupKey, {
                key: groupKey,
                dayKey,
                shiftId: item.shiftId || "",
                bartenderName: item.bartenderName || "",
                startedAtISO: startedAt,
                endedAtISO: endedAt,
                lastReceiptAtISO: receiptTime,
                label,
                total: 0,
                cashTotal: 0,
                cardTotal: 0,
                active: currentSystem === "sport" && item.shiftId && !endedAt,
                receipts: []
            });
        }

        const group = map.get(groupKey);
        if (startedAt && (!group.startedAtISO || String(startedAt).localeCompare(String(group.startedAtISO)) < 0)) group.startedAtISO = startedAt;
        if (endedAt && (!group.endedAtISO || String(endedAt).localeCompare(String(group.endedAtISO)) > 0)) group.endedAtISO = endedAt;
        if (receiptTime && (!group.lastReceiptAtISO || String(receiptTime).localeCompare(String(group.lastReceiptAtISO)) > 0)) group.lastReceiptAtISO = receiptTime;
        const total = Number(item.total || 0);
        if (normalizePaymentMethod(item.paymentMethod) === "card") group.cardTotal += total;
        else group.cashTotal += total;
        group.total += total;
        group.receipts.push(item);
    });

    return Array.from(map.values()).sort((a, b) => {
        const aDate = a.endedAtISO || a.startedAtISO || a.dayKey || a.key;
        const bDate = b.endedAtISO || b.startedAtISO || b.dayKey || b.key;
        return String(bDate).localeCompare(String(aDate));
    });
}

function ensureSelectedHistoryDay(groupedByDay) {
    const dayKeys = groupedByDay.map(group => group.key);
    if (!dayKeys.length) {
        historySelectedDayKey = null;
        return;
    }
    if (!historySelectedDayKey || !dayKeys.includes(historySelectedDayKey)) {
        const activeGroup = groupedByDay.find(group => group.active);
        historySelectedDayKey = activeGroup ? activeGroup.key : dayKeys[0];
    }
}

function updateHistoryMonthTitle() {
    if (historyMonthTitle) {
        historyMonthTitle.textContent = String(historyViewDate.getFullYear());
    }
    renderHistoryMonthGrid();
}

function renderHistoryMonthGrid() {
    if (!historyMonthGrid) return;
    const currentMonth = historyViewDate.getMonth();
    const year = historyViewDate.getFullYear();
    const monthNames = Array.from({ length: 12 }, (_, index) => {
        const name = new Date(year, index, 1).toLocaleString("ru-RU", { month: "short" });
        return name.charAt(0).toUpperCase() + name.slice(1).replace(".", "");
    });

    historyMonthGrid.innerHTML = monthNames.map((name, index) => `
        <button type="button" class="history-month-chip ${index === currentMonth ? "active" : ""}" onclick="selectHistoryMonth(${index})">
            ${escapeHtml(name)}
        </button>
    `).join("");
}

async function selectHistoryMonth(monthIndex) {
    historyViewDate.setMonth(monthIndex);
    await loadHistoryForCurrentSystem();
}
window.selectHistoryMonth = selectHistoryMonth;

function updateHistoryDayTitle(groupedByDay) {
    if (!historyDayTitle) return;
    if (!groupedByDay.length || !historySelectedDayKey) {
        historyDayTitle.textContent = currentSystem === "sport" ? "Нет смен" : "Нет дней";
        return;
    }

    const selectedGroup = groupedByDay.find(group => group.key === historySelectedDayKey);
    if (currentSystem === "sport") {
        historyDayTitle.textContent = selectedGroup?.active
            ? "Открытая смена — чеки в процессе"
            : "Выберите закрытую смену ниже";
        return;
    }

    historyDayTitle.textContent = selectedGroup?.label || formatDayHeading(historySelectedDayKey);
}

function selectHistoryShift(groupKey) {
    historySelectedDayKey = groupKey;
    renderHistory();
}
window.selectHistoryShift = selectHistoryShift;

function updateHistoryDayButtons(groupedByDay) {
    const dayKeys = groupedByDay.map(group => group.key);
    if (!dayKeys.length || !historySelectedDayKey) {
        if (prevDayBtn) prevDayBtn.disabled = true;
        if (nextDayBtn) nextDayBtn.disabled = true;
        return;
    }
    const index = dayKeys.indexOf(historySelectedDayKey);
    if (prevDayBtn) prevDayBtn.disabled = index >= dayKeys.length - 1;
    if (nextDayBtn) nextDayBtn.disabled = index <= 0;
}

function moveHistoryDay(direction) {
    const groupedByDay = groupHistoryByDay(getHistoryForVisibleMonth());
    const dayKeys = groupedByDay.map(group => group.key);
    if (!dayKeys.length || !historySelectedDayKey) return;
    const currentIndex = dayKeys.indexOf(historySelectedDayKey);
    if (currentIndex < 0) return;
    const nextIndex = currentIndex + direction;
    if (nextIndex >= 0 && nextIndex < dayKeys.length) {
        historySelectedDayKey = dayKeys[nextIndex];
        renderHistory();
    }
}

async function clearHistory() {
    if (!currentSystem) return;
    const state = getState();

    if (currentSystem === "sport") {
        const visibleHistory = getHistoryForVisibleMonth();
        let groupedByDay = groupHistoryByDay(visibleHistory);
        groupedByDay = addActiveSportShiftGroup(groupedByDay);
        ensureSelectedHistoryDay(groupedByDay);
        const selectedGroup = groupedByDay.find(group => group.key === historySelectedDayKey);

        if (!selectedGroup || !selectedGroup.receipts.length) {
            showAlert("В выбранной смене чеков нет.", "История");
            return;
        }

        const receiptIdsToDelete = new Set(selectedGroup.receipts.map(item => item.id));
        const shiftLabel = selectedGroup.active
            ? "текущую открытую смену"
            : `смену ${getShiftRangeLabel(selectedGroup)}`;

        showConfirm(`Очистить чеки за ${shiftLabel}?`, async () => {
            const ids = Array.from(receiptIdsToDelete);
            const deletedFromCloud = await deleteSportReceiptsFromCloud(ids);
            if (!deletedFromCloud) return;
            rememberDeletedSportReceiptIds(ids);
            state.receiptHistory = state.receiptHistory.filter(item => !receiptIdsToDelete.has(item.id));
            saveCurrentSystemState();
            historySelectedDayKey = null;
            renderHistory();
            showToast("История выбранной смены очищена", "success", "Готово");
        }, "Подтверждение");
        return;
    }

    const visibleHistory = getHistoryForVisibleMonth();
    if (!visibleHistory.length) {
        showAlert("История чеков пуста.", "История");
        return;
    }

    closeHistoryModal();
    showConfirm("Очистить историю чеков за выбранный месяц?", async () => {
        if (SYSTEM_CONFIG[currentSystem].cloudHistory) {
            const historyTable = currentSystem === "cafe"
                ? "cafe_receipts_history"
                : "receipts_history";
            const start = new Date(historyViewDate.getFullYear(), historyViewDate.getMonth(), 1);
            const end = new Date(historyViewDate.getFullYear(), historyViewDate.getMonth() + 1, 1);
            const { error } = await supabaseClient
                .from(historyTable)
                .delete()
                .gte("created_at", start.toISOString())
                .lt("created_at", end.toISOString());

            if (error) {
                console.error("Ошибка очистки истории:", error);
                showAlert("Не удалось очистить историю в базе", "Ошибка");
                return;
            }
        }

        const targetMonth = historyViewDate.getMonth();
        const targetYear = historyViewDate.getFullYear();
        state.receiptHistory = state.receiptHistory.filter(item => {
            const date = new Date(item.createdAtISO || item.createdAt);
            return Number.isNaN(date.getTime()) || date.getMonth() !== targetMonth || date.getFullYear() !== targetYear;
        });
        saveCurrentSystemState();
        historySelectedDayKey = null;
        showAlert("История за выбранный месяц очищена.", "Готово");
    }, "Подтверждение");
}
window.clearHistory = clearHistory;

window.deleteHistoryReceipt = async function (receiptId) {
    if (!currentSystem || !receiptId) return;
    showConfirm("Удалить этот чек из истории?", async () => {
        const state = getState();

        if (currentSystem === "sport") {
            const deletedFromCloud = await deleteSportReceiptsFromCloud([receiptId]);
            if (!deletedFromCloud) return;
            rememberDeletedSportReceiptIds([receiptId]);
        } else if (SYSTEM_CONFIG[currentSystem].cloudHistory) {
            const historyTable = currentSystem === "cafe"
                ? "cafe_receipts_history"
                : "receipts_history";

            const { error } = await supabaseClient
                .from(historyTable)
                .delete()
                .eq("id", receiptId);

            if (error) {
                console.error("Ошибка удаления чека:", error);
                showAlert("Не удалось удалить чек", "Ошибка");
                return;
            }
        }

        state.receiptHistory = state.receiptHistory.filter(item => item.id !== receiptId);
        saveCurrentSystemState();
        renderHistory();
        showAlert("Чек удалён.", "Готово");
    }, "Подтверждение");
};

function getTableKeyByLabel(label) {
    if (label === "Стол 1") return "table1";
    if (label === "Стол 2") return "table2";
    if (label === "Стол 3") return "table3";
    if (label === "Стол 4") return "table4";
    if (label === "Амереканский бильярд") return "american";
    if (label === "Русский бильярд") return "russian";
    if (label === "На вынос") return "takeaway";
    return "ps";
}

function getTableTitle(tableKey) {
    if (isCafeOrderKey(tableKey)) return getCafeOrderLabel(tableKey);
    if (tableKey === "table1") return "Стол 1";
    if (tableKey === "table2") return "Стол 2";
    if (tableKey === "table3") return "Стол 3";
    if (tableKey === "table4") return "Стол 4";
    if (tableKey === "american") return "Амереканский бильярд";
    if (tableKey === "russian") return "Русский бильярд";
    if (tableKey === "takeaway") return "На вынос";
    return "PS Zone";
}

function getPaymentMethodLabel(method) {
    return normalizePaymentMethod(method) === "card" ? "Оплата по карте" : "Оплата наличными";
}

function normalizePaymentMethod(method) {
    return String(method || "").toLowerCase() === "card" ? "card" : "cash";
}

function inferPaymentMethodFromStatus(status) {
    const text = String(status || "").toLowerCase();
    return text.includes("карта") || text.includes("card") ? "card" : "cash";
}

function formatElapsedForReceipt(ms) {
    const totalMinutes = Math.floor(ms / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours <= 0 ? `${minutes} мин` : `${hours} ч ${minutes} мин`;
}

function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function formatMoney(value) {
    return `${Math.round(Number(value) || 0)}`;
}

function roundMoney(value) {
    return Math.round(Number(value) || 0);
}

function roundToOneDecimal(value) {
    return Math.round((Number(value) || 0) * 10) / 10;
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function getDayKey(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value).slice(0, 10);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatDateTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value || "");
    return date.toLocaleString("ru-RU");
}

function formatOnlyTime(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

function formatDayHeading(dayKey) {
    const date = new Date(`${dayKey}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dayKey;
    return date.toLocaleDateString("ru-RU", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function escapeJs(text) {
    return String(text)
        .replaceAll("\\", "\\\\")
        .replaceAll("'", "\\'");
}

function init() {
    loadSystemState("sport");
    loadSystemState("cafe");
    updateHistoryMonthTitle();
    startGlobalTimerLoop();
}

init();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register("./service-worker.js");

      // принудительно проверить обновление
      reg.update();

      // если новый SW установлен — обновить страницу
      let refreshing = false;

      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      });

      setInterval(() => {
        reg.update();
      }, 60000); // проверка раз в минуту
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  });
}
