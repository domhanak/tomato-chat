
import { ChannelFilter } from '../constants/ChannelFilter';

export const channelFilter = (prevState: ChannelFilter = ChannelFilter.All, action: Action): ChannelFilter => {
    switch (action.type) {
        default:
            return prevState;
    }
};
