# BiddingGo 

<br>

<p align="center">
<img src="./assets/images/로고2.png"  width="300"/>
</p>

<br>

<p align="center">
<img src="./assets/images/로고3.png"  width="1200"/>
</p>

# Bidding mate

<table>
  
  <tr>
    <th>김진혁</th>
    <th>박선우</th>
    <th>윤정윤</th>
    <th>이민경</th>
    <th>이애은</th>
    <th>한규진
  </tr>
  
 <tr>

  <td align="center"><img src="./assets/images/프랑키.png" width="150" height="210" style="object-fit: cover;" alt="김진혁" /></td>
  <td align="center"><img src="./assets/images/징베.png" width="150" height="210" style="object-fit: cover;" alt="박선우" /></td>   
  <td align="center"><img src="./assets/images/니카.png" width="150" height="210" style="object-fit: cover;" alt="윤정윤" /></td>   
  <td align="center"><img src="./assets/images/키드.png" width="150" height="210" style="object-fit: cover;" alt="이민경" /></td>  
  <td align="center"><img src="./assets/images/트라팔가 로우.png" width="150" height="210" style="object-fit: cover;" alt="이애은" /></td>   
  <td align="center"><img src="./assets/images/거프.png" width="150" height="210" style="object-fit: cover;" alt="한규진" /></td>  

</tr>

  <tr>
    <td align="center">
      <a href="https://github.com/jin605"><img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logoColor=white" /></a>
    </td> 
    <td align="center">
      <a href="https://github.com/melly8954"><img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logoColor=white" /></a>
    </td>
    <td align="center">
      <a href="https://github.com/penep0"><img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logoColor=white" /></a>
    </td>
    <td align="center">
      <a href="https://github.com/alskung1101"><img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logoColor=white" /></a>
    </td>
    <td align="center">
      <a href="https://github.com/nueeaeel"><img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logoColor=white" /></a>
    </td>
    <td align="center">
      <a href="https://github.com/softworldqjin"><img src="https://img.shields.io/badge/github-181717.svg?style=for-the-badge&logoColor=white" /></a>
    </td>
  </tr>
</table>
    
---


# 목차
<br/>

1. [프로젝트 개요](#1--프로젝트-개요)
2. [화면 및 기능 설계서](#2--화면-및-기능-설계서)
3. [테스트 결과 보고서](#3--테스트-결과-보고서)
4. [시연](#4--시연)
5. [회고](#5--회고)

---
# 1.  프로젝트 개요
<br/> 

## 📍 프로젝트 소개
**Biddinggo는 실시간 경매 기반의 중고 및 리셀 거래 플랫폼입니다.**  
사용자는 상품을 등록하고 다양한 경매 방식(일반 경매, 연장 경매, 타임딜 등)을 통해 판매할 수 있으며, 구매자는 실시간 입찰을 통해 원하는 상품을 경쟁적으로 구매할 수 있습니다.  

또한, 실시간 알림(SSE) 기반으로 입찰 상황을 즉시 반영하여 사용자에게 몰입감 있는 거래 경험을 제공합니다.  
특히, **빅크리 경매(Vickrey Auction, 2등 가격 경매)** 방식을 도입하여 보다 공정하고 전략적인 가격 형성을 지원합니다.

---

## 📍 배경 (이 서비스가 필요한 이유)

### 1. 기존 중고 거래 플랫폼의 가격 결정 한계
- 번개장터, 당근마켓 등은 정가 기반 거래로 적정 가격 형성이 어려움  
- 협상 과정이 비효율적이며 사용자 경험 저하  

### 2. 리셀 시장 성장과 공정한 거래 필요성 증가
- 한정판 및 인기 상품은 가격 변동성이 큼  
- 경매 방식이 가장 합리적인 가격 형성 구조지만 지원 플랫폼이 제한적  

### 3. 기존 경매 플랫폼의 UX 및 기능 한계
- UI/UX가 직관적이지 않고 사용성이 떨어짐  
- 실시간 입찰 경험 부족 및 시스템 반응 속도 문제  

---

## 📍 기존 서비스와의 차별점

### 📌 기존 서비스

#### KREAM
- 패션/스니커즈 특화 플랫폼  
- 모든 거래에 검수 필수 → 거래 속도 느림  
- 경매 방식이 아닌 호가 기반 거래  

#### 코베이옥션
- 전통적인 경매 플랫폼  
- UI/UX가 올드하고 접근성이 낮음  
- 실시간성 및 사용자 경험 부족  

---

### ✅ Biddinggo의 차별점

#### 1. 빅크리(Vickrey) 기반 경매 시스템
- 최고 입찰자가 낙찰되지만, 실제 결제 금액은 두 번째로 높은 입찰가로 결정  
- 과도한 가격 경쟁 방지  
- 사용자가 자신의 최대 지불 의사를 정직하게 반영하도록 유도  

#### 2. AI 기반 상품 예측가 제공
- 과거 거래 데이터 및 유사 상품 데이터를 기반으로 적정 가격 제시  
- 판매자/구매자 모두 합리적인 의사결정 가능  

#### 3. AI 기반 유사 상품 검색
- 이미지 및 텍스트 기반 유사도 분석  
- 검색 효율 및 사용자 경험 향상  

#### 4. 다양한 경매 옵션 제공
- 연장 경매 (마감 직전 입찰 시 자동 연장)  
- 타임딜 경매 (짧은 시간 집중 경쟁)  
- 검수 경매 (신뢰 기반 거래)  

#### 5. 실시간 입찰 시스템 (SSE 기반)
- 입찰 상태 및 알림을 실시간 반영  
- 사용자 간 경쟁 상황을 즉각적으로 체감 가능  

#### 6. 100% 에스크로 기반 안전 거래
- 거래 금액을 중간 보관 후 완료 시 정산  
- 구매자/판매자 자산 보호  

#### 7. 현대적인 UI/UX
- 직관적인 경매 흐름 제공  
- 기존 경매 서비스 대비 사용성 개선  

---

## 📍 기대 효과

- **합리적인 가격 형성**
  - 빅크리 경매 구조를 통한 공정한 시장 가격 결정  

- **거래 신뢰도 향상**
  - 에스크로 + 검수 옵션 기반 안전 거래 환경  

- **사용자 참여도 증가**
  - 실시간 입찰 및 알림으로 몰입도 상승  

- **판매 효율 극대화**
  - 다양한 경매 옵션을 통한 유연한 판매 전략  

- **플랫폼 경쟁력 확보**
  - AI + 실시간 시스템 + 경매 구조 결합
<br/>

---

# 2.  화면 및 기능 설계서

<details>
  <summary>화면 및 기능 설계서 상세보기</summary>
<p align="center">
  <img src="./assets/images/피그마 캡처.png" alt="화면 및 기능 설계서 미리보기" width="1000" />
  <br/>
  <br/>
  🔗 <a href="https://www.figma.com/design/0dOGV93f5reRfWgJiv1rBH/Biddinggo?node-id=185-1330&t=DaXBKBPbxL8Q8Hgr-1">화면 및 기능 설계서 [Figma 링크]</a>
</p>
</details>

<br>

---



# 3.  테스트 결과 보고서

<details>
  <summary>테스트 결과 보고서 상세보기</summary>
  <p align="center">
  <img src="./assets/images/프론트엔드 테스트 보고서.png" alt="테스트 결과 보고서" width="1000" />
  <br/>
  <br/>
    🔗 <a href="https://docs.google.com/spreadsheets/d/16YGKpTcpo310JjvUu9Q1Nm9atCI-XYx5TB2GD3ocx3E/edit?gid=967734658#gid=967734658">테스트 결과 보고서 [스프레드 시트]</a>
</p>
</details>

<br/> 


---

# 4.  시연

<details>
  <summary>시연 상세보기</summary>
  <br />

  <details style="margin-left: 20px;">
    <summary>회원가입</summary>
    <ul>
      <br>
      <li>최초 소셜 로그인 시 회원가입 화면이 표시되며 필수 정보를 입력하면 회원가입이 완료됩니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/소셜회원가입.gif" width="800" alt="회원가입 시연" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>로그인</summary>
    <ul>
      <br>
      <li>등록된 계정으로 간편하게 로그인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/로그인.gif" width="800" alt="로그인 시연" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>로그아웃</summary>
    <ul>
      <br>
      <li>현재 세션을 종료하고 안전하게 로그아웃합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/로그아웃.gif" width="800" alt="로그아웃 시연" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>홈 화면</summary>
    <ul>
      <br>
      <li>메인 배너를 통해 서비스의 특징을 파악하고 실시간으로 업데이트되는 인기 경매 물품 목록을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/홈화면.gif" width="800" alt="홈 화면" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>일반 경매 등록</summary>
    <ul>
      <br>
      <li>매자가 상품 정보와 시작가 여유 있는 마감 기한을 설정하여 기본적인 경매 물품으로 등록합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/일반경매등록.gif" width="800" alt="일반 경매 등" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>타임딜 경매 등록</summary>
    <ul>
      <br>
      <li>단시간 내에 종료되는 전략적인 경매를 위해 짧은 마감 시간을 설정한 타임딜 상품을 등록합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/타임딜경매등록.gif" width="800" alt="타임딜 경매 등록" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>연장 경매 등록</summary>
    <ul>
      <br>
      <li>경매 등록 시 '연장 경매' 옵션을 선택하여 마감 직전 입찰 시 시간이 자동으로 연장되는 상품을 생성합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/연장경매등록.gif" width="800" alt="연장 경매 등록" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>연장 경매</summary>
    <ul>
      <br>
      <li>경매 종료 1분 전 입찰이 발생하면 마감 시간이 자동으로 3분 연장되어 치열한 입찰 경쟁이 유지되는 로직을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/연장경매.gif" width="800" alt="연장 경매" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>검수 신청</summary>
    <ul>
      <br>
      <li>사전 검수 상품 등록을 위해 검수 서비스를 신청합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/검수신청.gif" width="800" alt="검수 신청" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>검수 배송 정보 등록</summary>
    <ul>
      <br>
      <li>판매자가 검수를 위해 물품을 지정된 주소로 관리자에게 발송합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/검수배송정보등록.gif" width="800" alt="검수 배송 정보 등록" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>검수 승인 [관리자]</summary>
    <ul>
      <br>
      <li>검수 결과가 적합한 상품에 대해 승인을 처리합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/검수승인.gif" width="800" alt="검수 승인" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>검수 반려 [관리자]</summary>
    <ul>
      <br>
      <li>상품 정보가 부적합하거나 검수 기준 미달 시 요청을 거절합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/검수반려.gif" width="800" alt="검수 반" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>검수 반려 확인</summary>
    <ul>
      <br>
      <li>검수 반려 이후 반려된 상품의 현재 상태를 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/검수반려이후.gif" width="800" alt="검수 반려 확인" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>신고 및 자동 정지 시스템</summary>
    <ul>
      <br>
      <li>부적절한 활동으로 누적 신고 10회 초과 시 해당 사용자의 계정이 자동으로 정지되어 서비스 이용이 제한되는 보호 로직을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/신고.gif" width="800" alt="신고 및 자동 정지 시스템" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>낙찰 프로세스</summary>
    <ul>
      <br>
      <li>경매 마감 직후 최고가 입찰자에게 낙찰 알림이 발송되며 구매자와 판매자의 마이페이지 내역에 각각 거래 정보가 즉시 등록되는 것을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/낙찰.gif" width="800" alt="낙찰 프로세스" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>즉시 구매</summary>
    <ul>
      <br>
      <li>즉시 낙찰 가능 경매에서 낙찰을 진행하고 구매 내역에 즉시 등록되는 것을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/즉시구매.gif" width="800" alt="즉시구매" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>경매 문의 답변 등록 - 상세페이지</summary>
    <ul>
      <br>
      <li>상품 상세페이지에서 직접 문의를 등록하고 동일한 페이지에서 즉시 답변을 작성하여 소통합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/경매문의상세페이지답변.gif" width="800" alt="경매문의-상세페이지답변" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>경매 문의 답변 등록 - 마이페이지</summary>
    <ul>
      <br>
      <li>상세페이지에서 등록된 문의를 마이페이지에서 통합 조회하고 편리하게 답변을 등록하여 관리합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/경매문의마이페이지답변.gif" width="800" alt="경매문의-상세페이지답변" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>입찰 프로세스 (1)</summary>
    <ul>
      <br>
      <li>보유 포인트 초과 입찰 시 에러 메시지를 확인하고 잔액 범위 내 입찰 성공 후 포인트 차감 및 상세·마이페이지 내역 반영을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/첫번째입찰.gif" width="800" alt="입찰 프로세스 (1)" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>입찰 프로세스 (2)</summary>
    <ul>
      <br>
      <li>동일한 경매에 재입찰 시 기존 입찰금을 제외한 추가 차액만큼만 포인트가 차감되는 결제 로직을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/두번째입찰.gif" width="800" alt="입찰 프로세스 (2)" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>마이페이지 조회</summary>
    <ul>
      <br>
      <li>대시보드, 입찰·구매·판매 내역, 관심 경매, 경매 관리 및 문의 내역까지 사용자의 모든 활동 데이터를 한눈에 확인하고 관리합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/마이페이지조회.gif" width="800" alt="마이페이지 조회" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>포인트 충전</summary>
    <ul>
      <br>
      <li>충전 금액 입력 및 가상계좌 발급 후 토스 개발자 센터를 통한 입금 처리와 포인트 내역 반영까지의 전 과정을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/포인트충전.gif" width="800" alt="포인트 충전" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>포인트 인출</summary>
    <ul>
      <br>
      <li>보유 포인트를 인출 신청하고 포인트 이용 내역에 인출 정보가 즉시 업데이트되는 것을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/포인트인출.gif" width="800" alt="포인트 인출" />
    </p>
  </details>

   <details style="margin-left: 20px;">
    <summary>1대1 문의</summary>
    <ul>
      <br>
      <li>문의 필수값 검증 후 등록을 완료하고 관리자 페이지의 답변 등록을 거쳐 사용자가 최종 답변을 확인하는 전 과정을 시연합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/1대1문의.gif" width="800" alt="1대1 문의" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>탈퇴</summary>
    <ul>
      <br>
      <li>마이페이지에서 회원 탈퇴를 진행하고 이후 기존 계정으로 로그인이 불가능한 상태가 되는 것을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/탈퇴.gif" width="800" alt="탈퇴" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>낙찰 이후 배송지 정보 등록</summary>
    <ul>
      <br>
      <li>구매자의 배송지 입력과 판매자의 운송장 정보 등록 후 구매자 화면에서 '구매 확정' 버튼이 활성화되는 단계별 거래 흐름을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/낙찰이후배송등록.gif" width="800" alt="낙찰 이후 배송지 정보 등록" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>낙찰 이후 구매 확정 및 리뷰</summary>
    <ul>
      <br>
      <li>구매 확정 및 리뷰 작성을 진행하며 판매자의 대금 정산 확인과 판매자 프로필에 리뷰가 즉시 반영되는 통합 프로세스를 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/낙찰이후구매확정리뷰.gif" width="800" alt="낙찰 이후 구매 확정 및 리뷰" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>프로필 수정</summary>
    <ul>
      <br>
      <li>닉네임, 계좌번호, 이미지 등 개인 정보를 자유롭게 수정하고 관리할 수 있으며 닉네임은 첫 1회 변경 이후 30일 뒤에 재수정이 가능합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/프로필수정.gif" width="800" alt="프로필 수정 시연" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>배송지 관리</summary>
    <ul>
      <br>
      <li>배송지 추가/삭제 및 기본 배송지 설정을 통해 편리한 주소록 관리가 가능합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/배송지관리.gif" width="800" alt="배송지 관리 시연" />
    </p>
  </details>

 <details style="margin-left: 20px;">
    <summary>사용자 관리 [관리자]</summary>
    <ul>
      <br>
      <li>관리자 페이지에서 특정 계정을 비활성화하여 접근을 차단하고 필요 시 다시 복귀시켜 정상적인 서비스 이용을 가능하게 합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/어드민사용자관리.gif" width="800" alt="사용자 관리" />
    </p>
  </details>
  
  <details style="margin-left: 20px;">
    <summary>공지사항 추가 [관리자]</summary>
    <ul>
      <br>
      <li>필수값 입력 검증 후 공지사항을 등록하며 등록과 동시에 모든 사용자에게 실시간 알림이 전송되는 것을 확인합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/어드민공지사항.gif" width="800" alt="공지사항 추가" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>Admin 로그인 [관리자]</summary>
    <ul>
      <br>
      <li>아이디 및 비밀번호 필수값 입력 검증을 거쳐 관리자 전용 대시보드에 안전하게 접속합니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/어드민로그인.gif" width="800" alt="Admin 로그인" />
    </p>
  </details>

  <details style="margin-left: 20px;">
    <summary>Admin 로그아웃 [관리자]</summary>
    <ul>
      <br>
      <li>사용 중인 관리자 세션을 안전하게 종료하고 메인 화면으로 돌아갑니다.</li>
    </ul>
    <p align="center">
      <img src="./assets/demo/어드민로그아웃.gif" width="800" alt="Admin 로그아" />
    </p>
  </details>
</details>

<br>

---

# 5.  회고
<br/>

#### 김진혁
> 작성
 
#### 박선우
> 작성

#### 윤정윤
> 작성

#### 이민경
> 스프링 개발 경험이 부족해 처음에는 막막함이 컸지만 끝까지 포기하지 않고 목표를 달성해낸 과정은 무엇보다 뜻깊은 성장의 시간이었습니다. 특히 경매 서비스 특성상 포인트, 입찰, 회원 등 데이터 간의 관계가 복잡하게 얽혀 있어 로직을 설계하는 과정이 까다롭고 힘들기도 했습니다. 하지만 데이터 무결성을 위해 고민하며 효율적인 쿼리를 작성해 본 경험은 백엔드 로직의 깊이를 이해하는 데 큰 자산이 되었습니다. 어려운 순간마다 팀원들은 본인의 일처럼 함께 고민해 주었고 서로 피드백을 아끼지 않으며 막히는 부분을 함께 풀어나갔습니다. 동료들과 지식을 공유하고 소통하며 협업의 가치를 깨달은 덕분에 기술적인 성장을 넘어 함께 성장하는 즐거움을 배울 수 있었습니다. 그동안 함께 고생한 팀원분들께 진심으로 감사드립니다!

#### 이애은
> 작성

#### 한규진
> 작성


