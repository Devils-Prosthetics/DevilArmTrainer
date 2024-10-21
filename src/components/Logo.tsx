import logo from '../assets/DPP2.png';

export const Logo = ({className, size, ...props}: {className?: string, size: string}) => {
	return (
		<div className={className} {...props}>
			<img src={logo} width={`${size}px`} height={`${size}px`} />
		</div>
	);
}
