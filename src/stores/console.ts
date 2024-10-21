import { create } from 'zustand'

interface ConsoleState {
	output: string[],
	clear: () => void,
	add: (item: string) => void,
	set: (output: string[]) => void,
}

export const useConsoleStore = create<ConsoleState>((set) => ({
	output: ['Console output will show up here'],
	set: (output: string[]) => set({ output }),
	clear: () => set({ output: [] }),
	add: (item: string) => set((state) => {
		state.output.push(item);
		return {
			output: state.output
		}
	})
}))
