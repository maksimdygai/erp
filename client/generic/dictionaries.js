export default {
	apt_condition_types: [
		{id: 1, name: 'Отличное',            value: 'Отличное'},
		{id: 2, name: 'Хорошее',             value: 'Хорошее'},
		{id: 3, name: 'Евроремонт',          value: 'Евроремонт'},
		{id: 4, name: 'Кап. ремонт',         value: 'Кап. ремонт'},
		{id: 5, name: 'Под ремонт',          value: 'Под ремонт'},
		{id: 6, name: 'Стройвариант',        value: 'Стройвариант'},
		{id: 7, name: 'Дизайнерский ремонт', value: 'Дизайнерский ремонт'},
		{id: 8, name: 'Чистовая отделка',    value: 'Чистовая отделка'}
	],

	apt_types: [
		{id: 1,  name: 'N­-к квартира',                    value: 'N­-к квартира'},
		{id: 2,  name: 'Комната в коммунальной квартире', value: 'Комната в коммунальной квартире'},
		{id: 3,  name: 'Комната в общежитии',             value: 'Комната в общежитии'},
		{id: 4,  name: 'Частный дом (исп. для аренды)',   value: 'Частный дом (исп. для аренды)'},
		{id: 5,  name: '1­-к гостинка 12м',                value: '1­-к гостинка 12м'},
		{id: 6,  name: '1­-к гостинка 17м',                value: '1­-к гостинка 17м'},
		{id: 7,  name: '2­-к гостинка',                    value: '2­-к гостинка'},
		{id: 8,  name: '1­-к квартира',                    value: '1­-к квартира'},
		{id: 9,  name: '2­-к квартира',                    value: '2­-к квартира'},
		{id: 10, name: '3-к квартира',                    value: '3-к квартира'},
		{id: 11, name: '4­-к квартира',                    value: '4­-к квартира'},
		{id: 12, name: '5-к квартира',                    value: '5-к квартира'},
		{id: 13, name: 'Секция',                          value: 'Секция'}
	],

	balcony_types: [
		{id: 1, name: 'Есть',      value: 'Есть'},
		{id: 2, name: 'Нет',       value: 'Нет'},
		{id: 3, name: 'Застеклен', value: 'Застеклен'}
	],

	bathroom_types: [
		{id: 1, name: 'На улице',    value: 'На улице'},
		{id: 2, name: 'Нет ',        value: 'Нет '},
		{id: 3, name: 'Раздельный',  value: 'Раздельный'},
		{id: 4, name: 'Совмещенный', value: 'Совмещенный'}
	],

	building_wall_materials: [
		{id: 1, name: 'Каркасно­-монолитный', value: 'Каркасно­-монолитный'},
		{id: 2, name: 'Кирпич',              value: 'Кирпич'},
		{id: 3, name: 'Монолит',             value: 'Монолит'},
		{id: 4, name: 'Панель',              value: 'Панель'},
		{id: 5, name: 'Блок',                value: 'Блок'}
	],

	commodities: [
		{id: 1, name: 'Все',         value: 'Все'},
		{id: 2, name: 'Отсутствуют', value: 'Отсутствуют'},
		{id: 3, name: 'Частично',    value: 'Частично'}
	],

	communications: [
		{id: 1, name: 'Автоподъезд',   value: 'Автоподъезд'},
		{id: 2, name: 'Водоснабжение', value: 'Водоснабжение '},
		{id: 3, name: 'Газоснабжение', value: 'Газоснабжение'},
		{id: 4, name: 'Ж/д',           value: 'Ж/д'},
		{id: 5, name: 'Канализация',   value: 'Канализация'},
		{id: 6, name: '220В',          value: '220В'},
		{id: 7, name: '380В',          value: '380В'}
	],

	communic_canalisation: [
		{id: 1, name: 'Нет',               value: 'Нет'},
		{id: 2, name: 'Возможно провести', value: 'Возможно провести'},
		{id: 3, name: 'Центральная',       value: 'Центральная'},
		{id: 4, name: 'Сливная яма',       value: 'Сливная яма'},
		{id: 5, name: 'Септик',            value: 'Септик'}
	],

	communic_electricity: [
		{id: 1, name: 'Нет',               value: 'Нет'},
		{id: 2, name: 'Возможно провести', value: 'Возможно провести'},
		{id: 3, name: 'В доме',            value: 'В доме'},
		{id: 4, name: 'По улице',          value: 'По улице'}
	],

	communic_gas: [
		{id: 1, name: 'Нет',               value: 'Нет'},
		{id: 2, name: 'Возможно провести', value: 'Возможно провести'},
		{id: 3, name: 'В доме',            value: 'В доме'},
		{id: 4, name: 'По меже',           value: 'По меже'}
	],

	communic_phone: [
		{id: 1, name: 'Нет',               value: 'Нет'},
		{id: 2, name: 'Возможно провести', value: 'Возможно провести'},
		{id: 3, name: 'Да',                value: 'Да'}
	],

	communic_water: [
		{id: 1, name: 'Нет',                   value: 'Нет'},
		{id: 2, name: 'Возможно провести',     value: 'Возможно провести'},
		{id: 3, name: 'Водопровод в доме',     value: 'Водопровод в доме'},
		{id: 4, name: 'Водопровод на участке', value: 'Водопровод на участке'},
		{id: 5, name: 'Водопровод по улице',   value: 'Водопровод по улице'},
		{id: 6, name: 'Скважина',              value: 'Скважина'}
	],

	contract_statuses: [
		{id: 1, name: 'Черновик', value: 'Черновик'},
		{id: 2, name: 'Подписан', value: 'Подписан'},
		{id: 3, name: 'Закрыт', value: 'Закрыт'}
	],

	deal_statuses: [
		{id: 1,  color: '#eda8a7', name: 'Вход заявки',                          value: 'Вход заявки'},
		{id: 2,  color: '#edc4a6', name: 'Квалификация клиента',                 value: 'Квалификация клиента'},
		{id: 3,  color: '#ece1a5', name: 'Подбор вариантов',                     value: 'Подбор вариантов'},
		{id: 4,  color: '#dbeda5', name: 'Показ объектов',                       value: 'Показ объектов'},
		{id: 5,  color: '#bdeda5', name: 'Ожидание ответа от клиента',           value: 'Ожидание ответа от клиента'},
		{id: 6,  color: '#a6edc9', name: 'Оформление предварительного договора', value: 'Оформление предварительного договора'},
		{id: 7,  color: '#a6ece6', name: '[Ю/О] Распределение задач',            value: '[Ю/О] Распределение задач'},
		{id: 8,  color: '#a6ece6', name: '[Ю/О] Сбор документов',                value: '[Ю/О] Сбор документов'},
		{id: 9,  color: '#a6ece6', name: '[Ю/О] Проверка менеджером',            value: '[Ю/О] Проверка менеджером'},
		{id: 11, color: '#a6ece6', name: '[Ю/О] Проверка руководителем службы',  value: '[Ю/О] Проверка руководителем службы'},
		{id: 12, color: '#a6ece6', name: '[Ю/О] Проверка нотариусом',            value: '[Ю/О] Проверка нотариусом'},
		{id: 13, color: '#a7b8ee', name: 'Документы готовы',                     value: 'Документы готовы'},
		{id: 14, color: '#b3a6ee', name: 'Назначение встречи',                   value: 'Назначение встречи'},
		{id: 15, color: '#d0a6ee', name: 'Проведение сделки',                    value: 'Проведение сделки'},
		{id: 16, color: '#ba8adb', name: 'Получение комиссии агенства',          value: 'Получение комиссии агенства'},
		{id: 17, color: '#998adb', name: 'Регистрация документов',               value: 'Регистрация документов'},
		{id: 18, color: '#8b9edb', name: 'Передача документов клиенту',          value: 'Передача документов клиенту'},
		{id: 19, color: '#89da90', name: 'Завершена',                            value: 'Завершена'},
		{id: 20, color: '#d66d6c', name: 'Сорвана (уже купил)',                  value: 'Сорвана (уже купил)'},
		{id: 21, color: '#d66d6c', name: 'Сорвана (работает с конкурентами)',    value: 'Сорвана (работает с конкурентами)'}
	],

	defaultRadioOptions: [
		{label: 'Не уст.', value: 0},
		{label: 'Да'     , value: 1},
		{label: 'Нет'    , value: 2}
	],

	districts: {
		'c1cfe4b9-f7c2-423c-abfa-6ed1c05a15c5': [
			{id: 1, name: 'Ворошиловский',   value: 'Ворошиловский'},
			{id: 2, name: 'Железнодорожный', value: 'Железнодорожный'},
			{id: 3, name: 'Кировский',       value: 'Кировский'},
			{id: 4, name: 'Ленинский',       value: 'Ленинский'},
			{id: 5, name: 'Октябрьский',     value: 'Октябрьский'},
			{id: 6, name: 'Первомайский',    value: 'Первомайский'},
			{id: 7, name: 'Пролетарский',    value: 'Пролетарский'},
			{id: 8, name: 'Советский',       value: 'Советский'}
		],

		'3809afb6-fdfd-4115-9e55-236abf108c81': [
			{id: 1, name: 'Северный',    value: 'Северный'},
			{id: 2, name: 'Западный',    value: 'Западный'},
			{id: 3, name: 'Центр',       value: 'Центр'},
			{id: 4, name: 'Восточный',   value: 'Восточный'},
			{id: 5, name: 'Южный',       value: 'Южный'},
			{id: 6, name: 'Авиагородок', value: 'Авиагородок'},
			{id: 7, name: 'Гайдара',     value: 'Гайдара'},
			{id: 8, name: 'РДВС',        value: 'РДВС'}
		]
	},

	elevation_types: [
		{id: 1, name: 'Автопогрузчик ', value: 'Автопогрузчик '},
		{id: 2, name: 'Башенный кран',  value: 'Башенный кран'},
		{id: 3, name: 'Козловый кран',  value: 'Козловый кран'},
		{id: 4, name: 'Кран­-балка',     value: 'Кран­-балка'},
		{id: 5, name: 'Ляда',           value: 'Ляда'},
		{id: 6, name: 'Мостовой кран',  value: 'Мостовой кран'},
		{id: 7, name: 'Подъемник',      value: 'Подъемник'},
		{id: 8, name: 'Тельфер',        value: 'Тельфер'}
	],

	entities: {
		users: {
			name_plural: 'пользователи',
			name_single: 'пользователь'
		},

		roles: {
			name_plural: 'роли',
			name_single: 'роль'
		}
	},

	entrance_types: [
		{id: 1, name: 'Для легкового авто', value: 'Для легкового авто'},
		{id: 2, name: 'Для грузового авто', value: 'Для грузового авто'},
		{id: 3, name: 'Нет въезда',         value: 'Нет въезда'}
	],

	entrance_road_types: [
		{id: 1, name: 'Грунтовый', 	value: 'Грунтовый'},
		{id: 2, name: 'Тырса', 		value: 'Тырса'},
		{id: 3, name: 'Асфальт', 	value: 'Асфальт'},
		{id: 4, name: 'Бетон', 		value: 'Бетон'},
		{id: 5, name: 'Бездорожье', value: 'Бездорожье'}
	],

	exclusive: [
		{id: 1, name: 'Э', value: 'Э'},
		{id: 2, name: 'Ф', value: 'Ф'}
	],

	floor_types: [
		{id: 1,   name: 'ДВП',              value: 'ДВП'},
		{id: 2,   name: 'Дерево',           value: 'Дерево'},
		{id: 3,   name: 'ДСП',              value: 'ДСП'},
		{id: 4,   name: 'Ковролин',         value: 'Ковролин'},
		{id: 5,   name: 'Ламинат',          value: 'Ламинат'},
		{id: 6,   name: 'Линолеум',         value: 'Линолеум'},
		{id: 7,   name: 'Плитка',           value: 'Плитка'},
		{id: 8,   name: 'Плиты перекрытия', value: 'Плиты перекрытия'},
		{id: 9,   name: 'Стяжка',           value: 'Стяжка'},
		{id: 10,  name: 'Теплые полы',      value: 'Теплые полы'},
		{id: 11,  name: 'Фанера',           value: 'Фанера'},
		{id: 12,  name: 'Паркет',           value: 'Паркет'}
	],

	form_errors: {
		isEmail  : 'Введите email в правильном формате',
		isLength : 'Это обязательное поле',
		ispattern: 'Введите данные в правильном формате',
		isUnique : 'Значение этого поля не должно повторяться'
	},

	furniture: [
		{id: 1,  name: 'Вся',         value: 'Вся'},
		{id: 2,  name: 'Отсутствует', value: 'Отсутствует'},
		{id: 3,  name: 'Частично',    value: 'Частично'}
	],

	garage: [
		{id: 1,  name: 'Есть', value: 'Есть'},
		{id: 2,  name: 'Нет',  value: 'Нет'}
	],

	heating_types: [
		{id: 1,  name: 'АГВ',      value: 'АГВ'},
		{id: 2,  name: 'Котел',    value: 'Котел'},
		{id: 3,  name: 'Нет',      value: 'Нет'},
		{id: 4,  name: 'Печное',   value: 'Печное'},
		{id: 5,  name: 'ТЭЦ',      value: 'ТЭЦ'},
		{id: 6,  name: 'Форсунка', value: 'Форсунка'}
	],

	hot_water: [
		{id: 1,  name: 'АГВ',                value: 'АГВ'},
		{id: 2,  name: 'Бойлер',             value: 'Бойлер'},
		{id: 3,  name: 'Колонка',            value: 'Колонка'},
		{id: 4,  name: 'Котел',              value: 'Котел'},
		{id: 5,  name: 'Нет',                value: 'Нет'},
		{id: 6,  name: 'ТЭЦ',                value: 'ТЭЦ'},
		{id: 7,  name: 'Электронагреватель', value: 'Электронагреватель'}
	],

	house_wall_materials: [
		{id: 1,  name: 'Газобетон',         value: 'Газобетон'},
		{id: 2,  name: 'Дерево',            value: 'Дерево'},
		{id: 3,  name: 'Кирпич',            value: 'Кирпич'},
		{id: 4,  name: 'Ит.кирпич',         value: 'Ит.кирпич'},
		{id: 5,  name: 'Обл. кирпич',       value: 'Обл. кирпич'},
		{id: 6,  name: 'Камень',            value: 'Камень'},
		{id: 7,  name: 'Монолит',           value: 'Монолит'},
		{id: 8,  name: 'Оштукатуренный',    value: 'Оштукатуренный'},
		{id: 9,  name: 'Ракушечник',        value: 'Ракушечник'},
		{id: 10, name: 'Саман',             value: 'Саман'},
		{id: 11, name: 'Саман/обл.кирпич',  value: 'Саман/обл.кирпич'},
		{id: 12, name: 'Шелеванный',        value: 'Шелеванный'},
		{id: 13, name: 'Шлакоблок',         value: 'Шлакоблок'},
		{id: 14, name: 'Шалокоблок/кирпич', value: 'Шалокоблок/кирпич'}
	],

	house_types: [
		{id: 1,  name: 'Частный сектор', value: 'Частный сектор'},
		{id: 2,  name: 'СНТ',            value: 'СНТ'},
		{id: 3,  name: 'ДНТ',            value: 'ДНТ'},
		{id: 4,  name: 'КП',             value: 'КП'},
		{id: 5,  name: 'Коттедж',        value: 'Коттедж'}
	],

	housing_stock: [
		{id: 1,  name: 'Новостройки',       value: 'Новостройки'},
		{id: 2,  name: 'Современное жилье', value: 'Современное жилье'},
		{id: 3,  name: 'Сталинский',        value: 'Сталинский'},
		{id: 4,  name: 'Старое жилье',      value: 'Старое жилье'},
		{id: 5,  name: 'Хрущевки',          value: 'Хрущевки'}
	],

	infrastructure: [
		{id: 1,  name: 'Бары и кафе',                       value: 'Бары и кафе'},
		{id: 2,  name: 'Кинотеатры',                        value: 'Кинотеатры'},
		{id: 3,  name: 'Больницы и диагностические центры', value: 'Больницы и диагностические центры'},
		{id: 4,  name: 'Образовательные учреждения',        value: 'Образовательные учреждения'},
	],

	joined_rooms: [
		{id: 1,  name: 'Нет',   value: 'Нет'},
		{id: 2,  name: '1 + 1', value: '1 + 1'},
		{id: 3,  name: '2 + 1', value: '2 + 1'},
		{id: 4,  name: '3 + 1', value: '3 + 1'}
	],

	landform_types: [
		{id: 1, name: 'Ровный',                  value: 'Ровный'},
		{id: 2, name: 'С небольшим уклоном',     value: 'С небольшим уклоном'},
		{id: 3, name: 'Со значительным уклоном', value: 'Со значительным уклоном'}
	],

	land_right_types: [
		{id: 1, name: 'Аренда',        value: 'Аренда'},
		{id: 2, name: 'Собственность', value: 'Собственность'},
		{id: 3, name: 'В пользовании', value: 'В пользовании'}
	],

	level_types: [
		{id: 1,  name: 'Отдельностоящее ', value: 'Отдельностоящее '},
		{id: 2,  name: 'Подвал ',          value: 'Подвал '},
		{id: 3,  name: 'Полуподвал',       value: 'Полуподвал'},
		{id: 4,  name: '1',                value: '1'},
		{id: 5,  name: '2',                value: '2'},
		{id: 6,  name: '3',                value: '3'}
	],

	lift_types: [
		{id: 1,  name: 'Пассажирский', value: 'Пассажирский'},
		{id: 2,  name: 'Грузовой',     value: 'Грузовой'}
	],

	loggia: [
		{id: 1,  name: 'Есть',       value: 'Есть'},
		{id: 2,  name: 'Нет',        value: 'Нет'},
		{id: 3,  name: 'Застеклена', value: 'Застеклена'}
	],

	lot_profiles: [
		{id: 1,   name: 'Автосервис ',    value: 'Автосервис '},
		{id: 2,   name: 'База отдыха',    value: 'База отдыха'},
		{id: 3,   name: 'Гараж',          value: 'Гараж'},
		{id: 4,   name: 'Отель', 		  value: 'Отель'},
		{id: 5,   name: 'Кафе',           value: 'Кафе'},
		{id: 6,   name: 'Магазин',        value: 'Магазин'},
		{id: 7,   name: 'Офис',           value: 'Офис'},
		{id: 8,   name: 'Парикмахерская', value: 'Парикмахерская'},
		{id: 9,   name: 'Пром.база',      value: 'Пром.база'},
		{id: 10,  name: 'Производство',   value: 'Производство'},
		{id: 11,  name: 'Сауна',          value: 'Сауна'},
		{id: 12,  name: 'Склад',          value: 'Склад'},
		{id: 13,  name: 'Столовая',       value: 'Столовая'},
		{id: 14,  name: 'Участок',        value: 'Участок'},
		{id: 15,  name: 'Цех',            value: 'Цех'},
		{id: 16,  name: 'Общепит',  	  value: 'Общепит'}
	],

	moderation_status_types: [
		{id: 0, name: 'Черновик',          value: 'Черновик'},
		{id: 1, name: 'Ожидает модерации', value: 'Ожидает модерации'},
		{id: 2, name: 'Одобрено',          value: 'Одобрено'},
		{id: 3, name: 'Отклонено',         value: 'Отклонено'}
	],

	note_types: [
		{id: 1,   name: 'Входящий звонок', 			icon: 'phone',    color: '#6656bc', value: 'Входящий звонок'},
		{id: 2,   name: 'Исходящий звонок', 		icon: 'phone',    color: '#6656bc', value: 'Исходящий звонок'},
		{id: 3,   name: 'Пропущенный звонок', 		icon: 'phone', 	  color: '#6656bc', value: 'Пропущенный звонок'},
		{id: 4,   name: 'Входящий Email', 			icon: 'envelope', color: '#F84880', value: 'Входящий Email'},
		{id: 5,   name: 'Исходящий Email', 			icon: 'envelope', color: '#F84880', value: 'Исходящий Email'},
		{id: 6,   name: 'Изменение статуса сделки', icon: 'check', 	  color: '#3dc6ab', value: 'Изменение статуса сделки'},
		{id: 201, name: 'Текстовое примечание',		icon: 'comment',  color: '#f39c12', value: 'Текстовое примечание'},
		{id: 301, name: 'Задача (звонок)', 			icon: 'calendar', color: '#B0905F', value: 'Задача (звонок)'},
		{id: 302, name: 'Задача (встреча)', 		icon: 'calendar', color: '#1382AC', value: 'Задача (встреча)'},
		{id: 303, name: 'Задача (прозвон)', 		icon: 'calendar', color: '#1E5441', value: 'Задача (прозвон)'}
	],

	object_types: [
		{id: 1, name: 'Квартиры (продажа)', 	   type: 'apartment_sale', 		value: 'Квартиры (продажа)'},
		{id: 2, name: 'Квартиры (аренда)',  	   type: 'apartment_rent', 		value: 'Квартиры (аренда)'},
		{id: 2, name: 'Коммерческая недвижимость', type: 'commercial_property', value: 'Коммерческая недвижимость'},
		{id: 2, name: 'Дома', 					   type: 'house', 				value: 'Дома'},
		{id: 2, name: 'Участки', 				   type: 'land', 				value: 'Участки'},
	],

	object_right_types: [
		{id: 1, name: 'Доля',          value: 'Доля'},
		{id: 2, name: 'Собственность', value: 'Собственность'}
	],

	phone_stations: [
		{id: 1,  name: 'ГТС', value: 'ГТС'},
		{id: 2,  name: 'ЦТС', value: 'ЦТС'}
	],

	placement: [
		{id: 1,  name: 'Угловое',   value: 'Угловое'},
		{id: 2,  name: 'Неугловое', value: 'Неугловое'}
	],

	price_inclusions: [
		{id: 1, name: 'Комм. платежи',  value: 'Комм. платежи'},
		{id: 2, name: 'НДС',            value: 'НДС'},
		{id: 3, name: 'Ремонт',         value: 'Ремонт'},
		{id: 4, name: 'Телефон',        value: 'Телефон'},
		{id: 5, name: 'Электроэнергия', value: 'Электроэнергия'}
	],

	progres_colors: [
		{id: 1, name: 'red',    value: '#ffb3ba'},
		{id: 2, name: 'orange', value: '#ffdfba'},
		{id: 3, name: 'salad',  value: '#ffffba'},
		{id: 4, name: 'green',  value: '#baffc9'}
	],

	property_types: [
		{id: 1, name: 'Муниципальная', value: 'Муниципальная'},
		{id: 2, name: 'Частная',       value: 'Частная'}
	],

	relief_types: [
		{id: 1, name: 'Ровный',                  value: 'Ровный'},
		{id: 2, name: 'С небольшим уклоном',     value: 'С небольшим уклоном'},
		{id: 3, name: 'Со значительным уклоном', value: 'Со значительным уклоном'}
	],

	rent_types: [
		{id: 1, name: 'Все',       value: 'Все'},
		{id: 2, name: 'Под офис',  value: 'Под офис'},
		{id: 3, name: 'Посуточно', value: 'Посуточно'}
	],

	roof_types: [
		{id: 1, name: 'Катепал',         value: 'Катепал'},
		{id: 2, name: 'Мягкая черепица', value: 'Мягкая черепица'},
		{id: 3, name: 'Ондулин',         value: 'Ондулин'},
		{id: 4, name: 'Оцинкованная',    value: 'Оцинкованная'},
		{id: 5, name: 'Рубероид',        value: 'Рубероид'},
		{id: 6, name: 'Черепица',        value: 'Черепица'},
		{id: 7, name: 'Шифер',           value: 'Шифер'}
	],

	security_types: [
		{id: 1, name: 'Вахтер',                 value: 'Вахтер'},
		{id: 2, name: 'Ответственное хранение', value: 'Ответственное хранение'},
		{id: 3, name: 'Охраняемая территория',  value: 'Охраняемая территория'}
	],

	sewerage_types: [
		{id: 1, name: 'Нет',               value: 'Нет'},
		{id: 2, name: 'Возможно провести', value: 'Возможно провести'},
		{id: 3, name: 'Центральная',       value: 'Центральная'},
		{id: 4, name: 'Сливная яма',       value: 'Сливная яма'}
	],

	task_statuses: [
		{id: 1, name: 'Без задач',  color: '#e8efe8', value: 'Без задач'},
		{id: 2, name: 'Просрочено', color: '#fdcda7', value: 'Просрочено'},
		{id: 3, name: 'На сегодня', color: '#d0eadd', value: 'На сегодня'}
	],

	utilities: [
		{id: 1, name: 'Вода',     	 value: 'Вода'},
		{id: 2, name: 'Газ',      	 value: 'Газ'},
		{id: 3, name: 'Свет',     	 value: 'Свет'},
		{id: 4, name: 'Телефон',  	 value: 'Телефон'},
		{id: 5, name: 'Канализация', value: 'Канализация'}
	],

	windows_directions: [
		{id: 1, name: 'Во двор',  value: 'Во двор'},
		{id: 2, name: 'На улицу', value: 'На улицу'}
	],

	windows_materials: [
		{id: 1, name: 'Дерево',         value: 'Дерево'},
		{id: 2, name: 'Металлопластик', value: 'Металлопластик'},
		{id: 3, name: 'Европакет',      value: 'Европакет'}
	],

	yard_types: [
		{id: 1, name: 'Отдельный',                               value: 'Отдельный'},
		{id: 2, name: 'Общий (Сложившийся порядок пользования)', value: 'Общий (Сложившийся порядок пользования)'},
		{id: 3, name: 'Общий (Судебный порядок пользования)',    value: 'Общий (Судебный порядок пользования)'},
		{id: 4, name: 'Порядок пользования не определён',        value: 'Порядок пользования не определён'}
	]
}
