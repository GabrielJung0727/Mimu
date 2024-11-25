let lockedChoices = {};

module.exports = {
    /**
     * {range:} - 주어진 범위에서 무작위 값을 생성
     * @param {string} min - 최소값
     * @param {string} max - 최대값
     * @returns {string} - 무작위 범위 값
     */
    range: (_, min, max) => {
        const value = Math.floor(Math.random() * (parseInt(max, 10) - parseInt(min, 10) + 1)) + parseInt(min, 10);
        return value.toString();
    },

    /**
     * {choose:} - 제공된 목록에서 무작위로 선택
     * @param {string[]} choices - 선택 항목
     * @returns {string} - 선택된 항목
     */
    choose: (_, ...choices) => {
        const choice = choices[Math.floor(Math.random() * choices.length)];
        lockedChoices['default'] = choices.indexOf(choice); // 기본 잠금된 선택값 저장
        return choice;
    },

    /**
     * {lockedchoose:} - 이전 {choose:}에서 선택된 값 기반
     * @param {string[]} choices - 선택 항목
     * @returns {string} - 잠긴 선택 항목
     */
    lockedchoose: (_, ...choices) => {
        const lockedIndex = lockedChoices['default'] || 0; // 기본 잠금된 값 반환
        return choices[lockedIndex] || choices[0];
    },

    /**
     * [$N] - 사용자가 입력한 N번째 단어를 반환
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {number} argIndex - N번째 인덱스 (1 기반)
     * @returns {string} - N번째 단어
     */
    argument: (context, argIndex) => {
        const args = context.args || [];
        return args[argIndex - 1] || `Argument ${argIndex} not found`;
    },

    /**
     * [$N+] - N번째 단어 이후 모든 단어를 반환
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {number} argIndex - N번째 인덱스 (1 기반)
     * @returns {string} - N번째 이후 모든 단어
     */
    argumentPlus: (context, argIndex) => {
        const args = context.args || [];
        return args.slice(argIndex - 1).join(' ') || `Arguments after ${argIndex} not found`;
    },

    /**
     * [$N-Z] - N번째부터 Z번째까지 단어를 반환
     * @param {Object} context - 명령 실행 컨텍스트
     * @param {number} startIndex - 시작 인덱스 (1 기반)
     * @param {number} endIndex - 끝 인덱스 (1 기반)
     * @returns {string} - 선택된 단어들
     */
    argumentRange: (context, startIndex, endIndex) => {
        const args = context.args || [];
        return args.slice(startIndex - 1, endIndex).join(' ') || `Arguments from ${startIndex} to ${endIndex} not found`;
    },
};
