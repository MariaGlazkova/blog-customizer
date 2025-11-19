import { CSSProperties, useEffect, useState } from 'react';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { type ArticleStateType } from '../../constants/articleProps';
import { loadPageState, savePageState } from '../../utils/articleStateStorage';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleState, setArticleState] = useState<ArticleStateType>(() =>
		loadPageState()
	);

	useEffect(() => {
		savePageState(articleState);
	}, [articleState]);

	const handleArticleStateChange = (nextState: ArticleStateType) => {
		setArticleState(nextState);
	};

	const mainStyle = {
		'--font-family': articleState.fontFamilyOption.value,
		'--font-size': articleState.fontSizeOption.value,
		'--font-color': articleState.fontColor.value,
		'--container-width': articleState.contentWidth.value,
		'--bg-color': articleState.backgroundColor.value,
	} as CSSProperties;

	return (
		<main className={styles.main} style={mainStyle}>
			<ArticleParamsForm onArticleStateChange={handleArticleStateChange} />
			<Article />
		</main>
	);
};
