export function chatReducerFactory(chatBubbleMap: Map<string, ChatBubble>) {
  return function chatReducer(state: Chat, action: ActionButtonEvent) {
    switch (action.type) {
      case "chat":
        if (
          state.chatBubbles
            .map((chatBubble) => chatBubble.id)
            .includes(action.value)
        ) {
          return state;
        }
        const newChatBubble = chatBubbleMap.get(action.value);
        if (!newChatBubble) {
          console.error(`Chat bubble with id ${action.value} not found.`);
          return state;
        }
        return {
          chatBubbles: [...state.chatBubbles, newChatBubble],
        };
      case "link":
        const url = action.value;
        window.open(url, "_blank");
        return { ...state };
      case "mail":
        const mailAddress = action.value;
        window.location.href = `mailto:${mailAddress}`;
        return {
          ...state,
        };
      case "download":
        const url2 = action.value;
        window.open(url2, "_blank")?.focus();
        return { ...state };
      default:
        return state;
    }
  };
}
