module.exports = {
    /**
     * {delete} - 트리거 메시지를 삭제
     * @param {Object} context - 명령 실행 컨텍스트
     * @returns {string} - 성공 또는 실패 메시지
     */
    delete: async (context) => {
        try {
            if (context.message) {
                await context.message.delete();
                return 'Trigger message deleted.';
            }
            return 'No trigger message found.';
        } catch (error) {
            console.error('Error deleting trigger message:', error);
            return 'Failed to delete trigger message.';
        }
    },

    /**
     * {delete_reply:} - 일정 시간 후 봇의 응답 메시지를 삭제
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {number} seconds - 삭제까지 대기할 초 단위 시간
     * @returns {string} - 성공 또는 실패 메시지
     */
    delete_reply: async (context, seconds) => {
        if (!seconds || isNaN(seconds) || seconds <= 0) {
            return 'Invalid duration for deletion.';
        }

        const delay = parseInt(seconds, 10) * 1000; // 밀리초 단위로 변환

        try {
            const reply = await context.reply({ content: 'This message will be deleted soon.', ephemeral: false });
            setTimeout(async () => {
                try {
                    await reply.delete();
                } catch (error) {
                    console.error('Error deleting reply:', error);
                }
            }, delay);

            return `Reply will be deleted in ${seconds} seconds.`;
        } catch (error) {
            console.error('Error creating reply for deletion:', error);
            return 'Failed to schedule reply deletion.';
        }
    },
};
