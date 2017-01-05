var Body = React.createClass({
	getInitialState(){
		return { items: [] }
	},

	componentDidMount(){
		$.getJSON('api/v1/items.json', (response) => { this.setState({ items: response}) } );
	},

	handleSubmit(item) {
		var newState = this.state.items.concat(item);
    this.setState({ items: newState });
  },

  handleDelete(id) {
		$.ajax({
			url: `/api/v1/items/${id}`,
			method: 'DELETE',
			success: (response) => {
				this.removeItemClient(id);
			}
		});
	},

	removeItemClient(id) {
		var newItems = this.state.items.filter((item) => {
			return item.id != id;
		});

		this.setState({ items: newItems });
	},

	onUpdate(item){
		$.ajax({
			url: `api/v1/items/${item.id}`,
			method: 'PUT',
			data: {item: item},
			success: (response) => {
				this.updateItems(item);
			}
		});
	},

	updateItems(item) {
		var newItems = this.state.items.filter((i) => {
			return item.id != i.id;
		});
		newItems.push(item);
		this.setState({items: newItems});
	},

	render() {
		return (
			<div>
				<NewItem handleSubmit={this.handleSubmit}/>
				<AllItems items={this.state.items} handleDelete={this.handleDelete} onUpdate={this.onUpdate} />
			</div>
		)
	}
});