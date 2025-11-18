import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useEffect, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	type ArticleStateType,
	type OptionType,
} from './constants/articleProps';
import {
	loadFormState,
	loadPageState,
	saveFormState,
	savePageState,
	normalizeArticleState,
} from './utils/articleStateStorage';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(() =>
		loadPageState()
	);
	const [formState, setFormState] = useState<ArticleStateType>(() =>
		loadFormState()
	);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	useEffect(() => {
		savePageState(articleState);
	}, [articleState]);

	useEffect(() => {
		saveFormState(formState);
	}, [formState]);

	const handleFormChange = (
		field: keyof ArticleStateType,
		value: OptionType
	) => {
		setFormState((prevState) => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleFormReset = () => {
		const resetState = normalizeArticleState(defaultArticleState);

		setFormState(resetState);
		setArticleState(resetState);
	};

	const handleApply = () => {
		setArticleState(formState);
	};

	const handleSidebarToggle = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	const handleSidebarClose = () => {
		setIsSidebarOpen(false);
	};

	const mainStyle = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={clsx(styles.main)} style={mainStyle}>
			<ArticleParamsForm
				formState={formState}
				isOpen={isSidebarOpen}
				onChange={handleFormChange}
				onFormReset={handleFormReset}
				onApply={handleApply}
				onToggle={handleSidebarToggle}
				onClose={handleSidebarClose}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
