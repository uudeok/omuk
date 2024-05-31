import styled, { css } from 'styled-components';

export type Role = 'round' | 'kakao' | 'cancel' | 'none';
export type Size = 'sm' | 'lg';

export const buttonRoleStyle = css<{ role?: Role }>`
    ${({ role }) => {
        if (role === 'round') {
            return css`
                border-radius: 10px;
            `;
        }

        if (role === 'kakao') {
            return css`
                background: url(//storage.keepgrow.com/admin/campaign/20200611043456590.svg) no-repeat center;
                background-position: 28px;
                /* background-color: ${(props) => props.theme.palette.kakaoColor}; */
                font-size: 1rem;
                cursor: pointer;
                margin-top: 1rem;
                width: 100%;
                color: black;
                border-radius: 10px;
                text-align: center;
                border: none;
                padding: 1rem;

                &:hover {
                    /* background-color: ${(props) => props.theme.palette.kakaoColor}; */
                }
            `;
        }

        if (role === 'cancel') {
            return css`
                background-color: whitesmoke;
                color: grey;
                border-radius: 10px;

                &:hover {
                    background-color: whitesmoke;
                    color: black;
                }
            `;
        }

        if (role === 'none') {
            return css`
                background-color: transparent;
                color: black;
                font-size: 1rem;
                justify-content: left;
                font-weight: normal;

                &:hover {
                    background-color: transparent;
                    color: var(--mainColorDk);
                }
            `;
        }
    }}
`;

export const buttonSizeStyle = css<{ size: Size }>`
    ${({ size }) => {
        if (size === 'sm') {
            return css`
                height: 35px;
            `;
        }

        if (size === 'lg') {
            return css`
                height: 45px;
            `;
        }
    }}
`;

export const ButtonBase = styled.button<{ role?: Role; size: Size }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 0 solid transparent;
    background-color: ${(props) => props.theme.colors.mainColorDk};
    color: white;
    cursor: pointer;
    font-size: 17px;
    // 요소 내의 텍스트가 줄바꿈 되지 않고 한 줄에 계속 표시
    white-space: nowrap;
    // 요소 내의 텍스트를 선택할 수 없도록 지정 (드래그방지)
    user-select: none;
    // 브라우저에서 폰트를 부드럽게 렌더링
    -webkit-font-smoothing: antialiased;
    font-weight: 600;
    transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.26;
        cursor: not-allowed;
    }

    &:hover {
        background-color: ${(props) => props.theme.colors.mainColorLg};
    }

    ${buttonRoleStyle};
    ${buttonSizeStyle}
`;
