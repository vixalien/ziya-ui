import { useState } from "react";

let Modal = ({ visible = false, children, ...props }) => {
	return (
		<>
			<div className="modal" {...props} {...{ visible: visible.toString() }}>
				{children}
			</div>
			<style jsx>{`
				.modal {
					display: none;
				}
				.modal[visible="true"] {
					display: block;
				}
			`}</style>
		</>
	);
};

export default Modal;
