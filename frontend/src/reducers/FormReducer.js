export default function FormReducer(state, action)
{
	switch (action.type) {
		case 'select':
		case 'text': {
			return {...state, [action.field]: action.value};
		}

		case 'file': {
			break;
		}

		default: {
			throw new Error(`Unknown action ${action.type}`);
		}
	}

}