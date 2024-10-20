import logo from '../assets/DPP2.png';

export const Logo = ({size, ...props}: {size: string}) => {
	return (
		<div {...props}>
			<img src={logo} width={`${size}px`} height={`${size}px`} />
		</div>
	);
}
