var NewItem = React.createClass({
	handleClick () {
		var name = this.refs.name.value;
		var description = this.refs.description.value;
		$.ajax({
			url: '/api/v1/items',
			type: 'POST',
			data: { item: { name: name, description: description } },
			success: (item) => {
				this.props.handleSubmit(item);
				this.refs.name.value = '';
				this.refs.description.value = '';
			}
		});
	},

	render() {
		return (
			<div>
				<input ref='name' placeholder="Enter the name" />
				<input ref='description' placeholder="Enter the description" />
				<button onClick={this.handleClick}>Submit</button>
			</div>
		)
	}
});