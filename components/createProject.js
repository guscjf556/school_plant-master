//중복확인을 해야 프로젝트 생성 동작으로 가도록하기
const render =`
  <div class="container mt-5">
    <h1 class="display-4 d-flex justify-content-center text-success">프로젝트 만들기</h1>
    <p class="lead d-flex justify-content-center">아래의 정보를 입력해주세요.</p>
    <div class="card" style="width: 80%;margin: auto">
    <div class="card-body">
      <div class="card-text">
        <form id="createProjectForm" action = "/o/create-project-process" method = "post" onsubmit="return didPassCheck();">
          <div class="form-group">
            <label for="projectTitle">프로젝트 이름</label>
            <input type="text" class="form-control" id="projectTitle" name="projectTitle" pattern="^.+$" required>
            <small class="form-text text-muted">프로젝트명을 적어주세요.</small>
          </div>
          <div class="form-group">
            <label for="projectDescription">프로젝트 소개</label>
            <textarea class="form-control" id="projectDescription" name="projectDescription" row="3"></textarea>
          </div>
          <div class="form-group">
            <label for="projectPasscode">프로젝트 가입 코드</label>
            <input type="text" class="form-control" id="projectPasscode" name="projectPasscode" required pattern="^\\S{8,}$">
            <!--
            <button type="button" id="duplicateCheck" class="btn btn-sm btn-warning" onclick="checkDuplicatePasscode()">중복확인<small class="badge badge-pill badge-dark">필수</small></button>
            -->
            <small id="duplicateCheckResult" class="form-text text-muted"></small>
            <small class="form-text text-muted">다른 사용자의 프로젝트 가입 시 필요한 코드입니다. 8개 이상의 문자(숫자, 특수기호 사용 가능)를 사용해주세요. (이 코드는 암호화되지 않습니다. 개인적인 비밀번호를 사용하지 말아주세요.)</small>
          </div>
          <input id="createProjectSubmit" type="submit" class="btn btn-success w-100" value="프로젝트 만들기">
        </form>
      </div>
    </div> 
  </div>
  <script>
  let didCheck = false;
  $('#projectPasscode').change((e) => {
    if(e.target.value.length < 8){
      $('#duplicateCheckResult').html('<span class="text-danger">8개 이상의 문자를 사용해야합니다(숫자, 특수기호 사용 가능)</span>');
      didCheck = false;
      return;
    }
    $.ajax({
      url: '/o/check-duplicate-passcode',
      type: 'post',
      data: { passcode: e.target.value },
      success: function(res){
        if(!res){
          $('#duplicateCheckResult').html('<span class="text-success">사용 가능한 코드입니다.</span>');
          didCheck = true;
        }
        else {
          $('#duplicateCheckResult').html('<span class="text-danger">허용되지 않은 코드입니다. 다른 코드를 사용해 주세요.</span>');
          didCheck = false;
        }
      },
    });
  });

  const didPassCheck = () => {
    if(didCheck){
      return true;
    }
    else {
      return false;
    };
  };

  </script>
`
//왜 onsubmit으로 통합해서 안 되는지 이유를 모르겠다. 일단 중복 확인해서 true, false값 해준 다음 onsubmit에서는 이미 나와있는 didCheck 값을 통해서 didPassCheck를 하는 두 단계로 나누어서 구현했다.

module.exports = render;