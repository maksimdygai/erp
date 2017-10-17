import React, {PropTypes} from 'react';
import Dropzone from 'react-dropzone';
import mergeArraysUniqueObjects from 'generic/helpers/merge-arrays-of-objects'

class DropField extends React.Component{
	constructor() {
		super();

		this.state = {
			data  : [],
			failed: []
		};
	}

	static contextTypes = {
		errors           : PropTypes.object,
		onChange         : PropTypes.func.isRequired,
		passValueToParent: PropTypes.func.isRequired,
		router           : PropTypes.object.isRequired
	}

	removeItem = (e, id) => {
		const
			newData = _.filter(this.state.data, I => I.name !== id);

		e.stopPropagation();
		this.setState({data: newData});

		this.context.passValueToParent(
			this.props.name,
			newData.length ? this.toBase64(newData) : undefined,
			null,
			null,
			true
		);
	}

	onDrop = (files, failed) => {
		const
			newData = this.props.allowMultiple ? 
						mergeArraysUniqueObjects(this.state.data, files, 'name')
						: files;

		this.setState({data: newData});
		this.context.passValueToParent(this.props.name, this.toBase64(newData), null, null, true);

		if(failed)
			this.setState({failed: failed});
	}

	toBase64(data) {
		let
			transformed = [];

		_.each(data, I => {
			const
				reader = new FileReader();

			reader.onload = e => {
				transformed.push({
					data: e.target.result,
					name: I.name
				});
			};

			reader.readAsDataURL(I);
		});

		return transformed;
	}

	render() {
		const
			{
				accepted = 'image/jpeg, image/jpg, image/png',
				allowMultiple = true,
				defaultErrorMessage = 'Это обязательное поле',
				name,
				required,
				title
			} = this.props,

			{data, failed} = this.state,
			errors = this.context ? this.context.errors : this.props.errors,
			error  = errors[name];

		return (
			<Dropzone
				accept={accepted}
				className='dropzone'
				maxSize={307200}
				multiple={allowMultiple}
				onDrop={this.onDrop}
			>
				{data.length == 0 ?
					(
						<div>
							<p className='message'>
								Перетащите сюда фото или кликните, чтобы открыть окно добавления
							</p>
							
							<p className="small">
								Доступны расширения: jpeg, jpg, png. Максимальный размер файла: 300Kb
							</p>
						</div>
					)
					:					
					data.map(I => 
						<div
							className="dz-preview dz-processing dz-error dz-complete dz-image-preview"
							key={I.name.substring(0, 10)}
						>
							<div className="dz-image" style={{backgroundImage: `url(${I.preview})`}}></div>

							<div className="dz-details">
								<i
									className='fa fa-2x fa-times-circle dz-preview-delete'
									onClick={e => this.removeItem(e, I.name)}
								></i>

								<div className="dz-size">
									<span data-dz-size="">
										<strong>{(I.size / 1024).toFixed(2)}</strong> KB
									</span>
								</div>

								<div className="dz-filename">
									<span data-dz-name="">{I.name}</span>
								</div>
							</div>
						</div>
					)
				}

				{failed.length ?
					(<p className='text-danger small'>
						{failed.length} файла не добавлены, т.к. не соответствуют по формату или размеру
					</p>)

					: null
				}
			</Dropzone>
		); 
	}
} 

export default DropField;
