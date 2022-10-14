import { UIState } from './';

type UIActionType = 
    | {type: 'UI - Open Sidebar'}
    | {type: 'UI - Close Sidebar'}
    | {type: 'UI - Open Adding Task'}
    | {type: 'UI - Close Adding Task'}
    | {type: 'UI - Start Dragging'}
    | {type: 'UI - End Dragging'}

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case 'UI - Open Sidebar':
            return {
                ...state,
                sidemenuOpen: true
            }
    
        case 'UI - Close Sidebar':
            return {
                ...state,
                sidemenuOpen: false
            }
        case 'UI - Open Adding Task':
            return {
                ...state,
                isAddingEntry: true
            }
        case 'UI - Close Adding Task':
            return {
                ...state,
                isAddingEntry: false
            }
        case 'UI - Start Dragging':
            return {
                ...state,
                isDragging: true
            }
        case 'UI - End Dragging':
            return {
                ...state,
                isDragging: false
            }
        default:
            return state
    }
}
