import { FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
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

import styles from './ArticleParamsForm.module.scss';

const FORM_ID = 'article-params-form';

type ArticleParamsFormProps = {
	formState: ArticleStateType;
	isOpen: boolean;
	onChange: (field: keyof ArticleStateType, value: OptionType) => void;
	onFormReset: () => void;
	onApply: () => void;
	onToggle: () => void;
	onClose: () => void;
};

export const ArticleParamsForm = ({
	formState,
	isOpen,
	onChange,
	onFormReset,
	onApply,
	onToggle,
	onClose,
}: ArticleParamsFormProps) => {
	const handleOptionChange =
		(field: keyof ArticleStateType) => (option: OptionType) => {
			onChange(field, option);
		};

	const handleFontSizeChange = (option: OptionType) => {
		onChange('fontSizeOption', option);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onToggle} ariaControls={FORM_ID} />
			<div
				className={clsx(styles.overlay, {
					[styles.overlay_visible]: isOpen,
				})}
				onClick={onClose}
				role='presentation'
			/>
			<aside
				id={FORM_ID}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<h2 className={styles.title}>
						<Text as='span' size={31} weight={800}>
							ЗАДАЙТЕ ПАРАМЕТРЫ
						</Text>
					</h2>

					<div className={styles.field}>
						<Select
							title='ШРИФТ'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleOptionChange('fontFamilyOption')}
						/>
					</div>

					<div className={styles.field}>
						<div className={styles.label}>
							<Text size={12} weight={800} uppercase>
								РАЗМЕР ШРИФТА
							</Text>
						</div>
						<div className={styles.fontSizeButtons}>
							{fontSizeOptions.map((option) => (
								<button
									key={option.value}
									type='button'
									className={clsx(styles.fontSizeButton, {
										[styles.fontSizeButton_active]:
											formState.fontSizeOption.value === option.value,
									})}
									onClick={() => handleFontSizeChange(option)}>
									<Text size={18} weight={800}>
										{option.title.toUpperCase()}
									</Text>
								</button>
							))}
						</div>
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
							onClick={onFormReset}
						/>
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
