import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	type ArticleStateType,
	type OptionType,
} from 'src/constants/articleProps';

import {
	loadFormState,
	loadPageState,
	saveFormState,
} from 'src/utils/articleStateStorage';

import styles from './ArticleParamsForm.module.scss';

const FORM_ID = 'article-params-form';

type ArticleParamsFormProps = {
	onArticleStateChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	onArticleStateChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const initialStateRef = useRef<ArticleStateType>(loadPageState());
	const [formState, setFormState] = useState<ArticleStateType>(() =>
		loadFormState()
	);

	useEffect(() => {
		saveFormState(formState);
	}, [formState]);

	const handleToggle = () => {
		setIsOpen((prev) => !prev);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	const handleOptionChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			setFormState((prev) => ({
				...prev,
				[field]: option,
			}));
		};

	const handleFontSizeChange = (option: OptionType) => {
		setFormState((prev) => ({
			...prev,
			fontSizeOption: option,
		}));
	};

	const handleFormReset = () => {
		const initialState = initialStateRef.current;

		setFormState(initialState);
		onArticleStateChange(initialState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onArticleStateChange(formState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={handleToggle}
				ariaControls={FORM_ID}
			/>
			<div
				className={clsx(styles.overlay, {
					[styles.overlay_visible]: isOpen,
				})}
				onClick={handleClose}
				role='presentation'
			/>
			<aside
				id={FORM_ID}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800}>
						<span className={styles.title}>ЗАДАЙТЕ ПАРАМЕТРЫ</span>
					</Text>

					<div className={styles.field}>
						<Select
							title='ШРИФТ'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleOptionChange('fontFamilyOption')}
						/>
					</div>

					<div className={styles.field}>
						<RadioGroup
							name='font-size'
							title='РАЗМЕР ШРИФТА'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleFontSizeChange}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='ЦВЕТ ШРИФТА'
							selected={formState.fontColor}
							options={fontColors}
							onChange={handleOptionChange('fontColor')}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='ЦВЕТ ФОНА'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={handleOptionChange('backgroundColor')}
						/>
					</div>

					<div className={styles.field}>
						<Select
							title='ШИРИНА КОНТЕНТА'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={handleOptionChange('contentWidth')}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='СБРОСИТЬ'
							htmlType='button'
							type='clear'
							onClick={handleFormReset}
						/>
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
