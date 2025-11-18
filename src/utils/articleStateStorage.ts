import {
	type ArticleStateType,
	type OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

const FORM_STATE_STORAGE_KEY = 'blog-customizer_form_state';
const PAGE_STATE_STORAGE_KEY = 'blog-customizer_page_state';

const isBrowser = typeof window !== 'undefined';

const mapOption = (
	options: OptionType[],
	storedOption?: OptionType,
	fallback?: OptionType
) => {
	if (!storedOption) {
		return fallback ?? options[0];
	}

	return (
		options.find((option) => option.value === storedOption.value) ??
		fallback ??
		options[0]
	);
};

export const normalizeArticleState = (
	state?: Partial<ArticleStateType>
): ArticleStateType => ({
	fontFamilyOption: mapOption(
		fontFamilyOptions,
		state?.fontFamilyOption,
		defaultArticleState.fontFamilyOption
	),
	fontSizeOption: mapOption(
		fontSizeOptions,
		state?.fontSizeOption,
		defaultArticleState.fontSizeOption
	),
	fontColor: mapOption(
		fontColors,
		state?.fontColor,
		defaultArticleState.fontColor
	),
	backgroundColor: mapOption(
		backgroundColors,
		state?.backgroundColor,
		defaultArticleState.backgroundColor
	),
	contentWidth: mapOption(
		contentWidthArr,
		state?.contentWidth,
		defaultArticleState.contentWidth
	),
});

const loadState = (storageKey: string): ArticleStateType => {
	if (!isBrowser) {
		return normalizeArticleState(defaultArticleState);
	}

	try {
		const rawState = window.localStorage.getItem(storageKey);

		if (!rawState) {
			return normalizeArticleState(defaultArticleState);
		}

		const parsedState = JSON.parse(rawState) as ArticleStateType;

		return normalizeArticleState(parsedState);
	} catch {
		return normalizeArticleState(defaultArticleState);
	}
};

const saveState = (storageKey: string, state: ArticleStateType) => {
	if (!isBrowser) return;

	window.localStorage.setItem(storageKey, JSON.stringify(state));
};

export const loadFormState = () => loadState(FORM_STATE_STORAGE_KEY);
export const loadPageState = () => loadState(PAGE_STATE_STORAGE_KEY);

export const saveFormState = (state: ArticleStateType) =>
	saveState(FORM_STATE_STORAGE_KEY, state);
export const savePageState = (state: ArticleStateType) =>
	saveState(PAGE_STATE_STORAGE_KEY, state);
