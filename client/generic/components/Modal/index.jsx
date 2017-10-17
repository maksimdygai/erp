import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import showModal from 'modules/main_page/actions/show_modal.js';

const
	Modal = (
		{cancelText='Отменить', children, header, isOpen, isSmall, noActions, show, noSubmit, submitText='Подтвердить', uniqueId}
	) => {

		let
			open = isOpen[uniqueId];

		return (
			<div
				aria-hidden="true"
				className={`modal fade ${open ? 'in' : ''}`}
				role="dialog"
				style={open ? {display: 'block'} : {}}
				tabIndex="-1"
			>
				<div className={`modal-dialog ${isSmall ? 'modal-sm' : ''}`}>
					<div className="modal-content">
						<div className="modal-header">
							<h3 className="modal-title">{header}</h3>
						</div>

						<div className="modal-body">
							{children}
						</div>

						{!noActions && <div className="modal-footer">
							<button
								className="btn btn-sm btn-default"
								data-dismiss="modal"
								onClick={() => show(uniqueId, false)}
								type="button"
							>
								{cancelText}
							</button>

							{!noSubmit && <button type="button" className="btn btn-sm btn-success">{submitText}</button>}
						</div>}
					</div>
				</div>
			</div>
		)
	}


function mapStateToProps(state) {
	return {
		isOpen: state.main_page.isModalOpen
	};
}

function mapDispatchToProps(dispatch) {
	return {
		show: bindActionCreators(showModal, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
