import { Children, HTMLAttributes, ReactElement, ReactNode, cloneElement, useId } from 'react';
import styles from '../../styles/common/common.module.css';

interface InputProps extends HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    children: ReactElement;
    bottomText?: string;
}

/** Input 컴포넌트는 children 으로 ReactElement 타입을 갖는다. 예시) <div>, <Component>
 * Children.only 함수는 children 이 하나의 ReactElement 인지 확인하고 그 자식을 반환하는 함수이다.
 * 이때 그 값을 child 에 할당해줬다.
 * child.props 객체를 통해 해당 엘리먼트의 속성들에 접근할 수 있다.
 *
 * label 태그에 useId 로 생성한 id 를 넣어준다
 * cloneElement 를 통해 children 으로 넣어준 ReactElement 를 복제하고 새로운 id 속성을 추가해 label 과 연결시킨다.
 * 즉 기존의 다른 모든 속성들을 유지한 새로운 Element 를 생성한다.
 */

const Input = ({ label, children, bottomText, ...props }: InputProps) => {
    const child = Children.only(children);
    const generatedId = useId();
    const id = child.props.id ?? generatedId;
    const isError: boolean = child.props.$hasError ?? false;

    return (
        <div className={styles.container} {...props}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            {cloneElement(child, {
                id,
                ...child.props,
            })}
            {bottomText != null ? (
                <p className={styles.text} style={{ color: isError ? 'var(--red600)' : 'var(--grey600)' }}>
                    {bottomText}
                </p>
            ) : null}
        </div>
    );
};

export default Input;
