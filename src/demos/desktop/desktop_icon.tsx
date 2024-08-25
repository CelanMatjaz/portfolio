import classNames from "classnames";

interface DesktopIconProps {
    onClick: () => void
    onDoubleClick: () => void
    isSelected: boolean;
};

export const DesktopIcon: React.FC<React.PropsWithChildren<DesktopIconProps>> = ({ children, onClick, onDoubleClick, isSelected }) => {
    return (
        <div
            className={classNames("desktop-icon", { selected: isSelected })}
            onClick={onClick}
            onDoubleClick={onDoubleClick}>
            {children}
        </div>
    );
}
