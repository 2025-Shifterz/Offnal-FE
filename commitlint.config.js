// commitlint.config.js
module.exports = {
  // extends를 빈 배열로 설정하여 @commitlint/config-conventional의 영향을 받지 않도록.
  extends: [],

  // 커스텀 파서 프리셋을 정의
  parserPreset: {
    parserOpts: {
      // 이전에 정의했던 당신의 커스텀 headerPattern을 그대로 사용
      // 이 패턴은 [type][scope]: subject 형식을 정확히 파싱
      headerPattern:
        /^\[(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)\]\[([a-zA-Z0-9]+)\]: (.+)$/,
      headerCorrespondence: ['type', 'scope', 'subject'], // 각 그룹을 'type', 'scope', 'subject'로 매핑
    },
  },

  rules: {
    // 타입은 정해진 목록에서만 허용
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    // 스코프(작성자)가 비어있지 않아야 함
    'scope-empty': [2, 'never'],
    // subject(내용)가 비어있으면 안 됨
    'subject-empty': [2, 'never'],
    // subject(내용) 끝에 마침표 금지
    'subject-full-stop': [2, 'never', '.'],
    // 전체 헤더 길이 제한
    'header-max-length': [2, 'always', 100],
    // 여기에 필요한 다른 규칙들을 추가할 수 있음
  },
};
