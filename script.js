class User{
    constructor(name,tckn){
        this.Name=name;
        this.tckn=tckn;
        this.Accounts=[];
    }

    addAccount(Account){
        this.Accounts.push(Account);
    }
    deleteAccount(Account){
        this.Accounts=this.Accounts.filter((account)=>account!==Account);
    }
    
}

class Account{
    constructor(name,accountbalance){
        this.Name=name;
        this.Accountbalance=accountbalance;

    }

}

const userList=[];

function addUser() {
    const name = document.getElementById("name").value.trim();
    const tckn = document.getElementById("tckn").value.trim();
    
    if (userList.some((user) => user.Name==name)) {
        alert("Kullanıcı Mevcut!!");
        return;
    }
    else if (tckn.length!=11) {
        var eksik=(11-tckn.length);
        alert("11 haneli TCNo'nuzun "+eksik+" hanesi eksiktir lütfen tekrar giriniz");
        return;
    }
    
    const user = new User(name);
    userList.push(user);
    document.getElementById("name").value = "";
    document.getElementById("name").focus;
    document.getElementById("tckn").value = "";
    document.getElementById("tckn").focus;

    userUpdate();
    userNameUpdate();
}

function addAccount(){
    const UserName=document.getElementById("selectUser").value;
    const Accountname=document.getElementById("accountName").value.trim();
    const Accountbalance=document.getElementById("accountBalance").value.trim();
    

    if(UserName==="" || Accountname==="" || Accountbalance<0 ){
        alert("Boş Alan Bırakmayınız");
        return;
    }

    const user=userList.find((userfind)=>userfind.Name===UserName);

    const selectAccount=user.Accounts.find((pf)=>pf.Name===Accountname)

    if(selectAccount!=null){
        selectAccount.Accountbalance=Number(Accountbalance)+Number(selectAccount.Accountbalance);
    }
    else{
        const account=new Account(Accountname,Accountbalance);

        user.addAccount(account);
    }

    userUpdate();
    userNameUpdate();
    document.getElementById("accountName").value="";
    document.getElementById("accountBalance").value="";
    
}


function userUpdate(){
    const selectUser=document.getElementById("selectUser");
    selectUser.innerHTML="<option disabled value selected> -- Kullanıcı Seç -- </option>";
    
    userList.forEach((user)=>{
        const option=document.createElement("option");
        option.value=user.Name;
        option.textContent=user.Name;
        selectUser.appendChild(option);
    })

    

    const accountList=document.getElementById("AccountList");
    accountList.innerHTML="";
    userList.forEach((user)=>{
        const tr=document.createElement("tr");
        const th=document.createElement("th");
        const thbtn=document.createElement("th");

        const deleteUserBtn=document.createElement("button");
        deleteUserBtn.textContent="Kullanıcıyı Sil";
        deleteUserBtn.className="btn btn-danger";

        deleteUserBtn.addEventListener("click",()=>{
            deleteUser(user.Name);
        })

        th.textContent=user.Name;
        th.colSpan=3;
        tr.appendChild(th);
        thbtn.appendChild(deleteUserBtn);
        tr.appendChild(thbtn);
        accountList.appendChild(tr);

        var number=0;
         var pl=[];

         pl=user.Accounts.sort((a, b) => (a.Name> b.Name) ? 1 : -1)
        
         pl.forEach((account)=>{
            number++;

            const rAccountName=document.createElement("option");
            rAccountName.value=user.Name+"/"+account.Name;
            rAccountName.textContent=user.Name+` (${user.Accountbalance})`;


            const AccountTr=document.createElement("tr");
            const NumberTd=document.createElement("td");
            NumberTd.textContent=number;
            
            const AccountNameTd=document.createElement("td");
            AccountNameTd.textContent=account.Name;

            const AccountbalanceTd=document.createElement("td");
            AccountbalanceTd.textContent=account.Accountbalance;
            
            const AccountDeleteTd=document.createElement("td");

            const deleteAccountBtn=document.createElement("button");
            deleteAccountBtn.textContent="Hesabı Sil";
            deleteAccountBtn.className="btn btn-warning";

            deleteAccountBtn.addEventListener("click",()=>{
                deleteAccount(user.Name,account);
            });

            AccountDeleteTd.appendChild(deleteAccountBtn);

            AccountTr.appendChild(NumberTd);
            AccountTr.appendChild(AccountNameTd);
            AccountTr.appendChild(AccountbalanceTd);
            AccountTr.appendChild(AccountDeleteTd);

            accountList.appendChild(AccountTr);
            
        })
    })
}
function deleteUser(name){
    userList.splice(userList.findIndex((user)=>user.Name===name),1);
    userUpdate();
}

function deleteAccount(UserName,Account){
    const user=userList.find((userfind)=>userfind.Name===UserName);
    user.deleteAccount(Account);

    userUpdate();
}

function userNameUpdate(){
    
    const uselectUser=document.getElementById("selectUser3");
    uselectUser.innerHTML="<option disabled value selected> -- Kullanıcı Seç -- </option>";
    
    const uselectUser2=document.getElementById("selectUser2");
    uselectUser2.innerHTML="<option disabled value selected> -- Kullanıcı Seç -- </option>";
    
    
    
    
    
    userList.forEach((user)=>{
        const option1=document.createElement("option");
        option1.value=user.Name;
        option1.textContent=user.Name;
        
        const option2=document.createElement("option");
        option2.value=user.Name;
        option2.textContent=user.Name;
        
        uselectUser.appendChild(option1);
        uselectUser2.appendChild(option2);
        
    })

    

    const selectAccountName=document.getElementById("uAccountName2");
    selectAccountName.innerHTML="<option disabled value selected> -- Hesap Seç -- </option>";

    const selectAccountName2=document.getElementById("rAccountName");
    selectAccountName2.innerHTML="<option disabled value selected> -- Hesap Seç -- </option>";


    const selectfirstAccount=document.getElementById("firstAccountName");
    selectfirstAccount.innerHTML="<option disabled value selected> -- Hesap Seç -- </option>";

    const selectsecondAccount=document.getElementById("secondAccountName");
    selectsecondAccount.innerHTML="<option disabled value selected> -- Hesap Seç -- </option>";

    userList.forEach((user)=>{
        
         var pl=[];

         pl=user.Accounts.sort((a, b) => (a.Name> b.Name) ? 1 : -1)
        
         pl.forEach((account)=>{
           

            const uAccountName2=document.createElement("option");
            uAccountName2.value=user.Name+"/"+account.Name;
            uAccountName2.textContent=account.Name+` (${account.Accountbalance})`;
            
            const uAccountName=document.createElement("option");
            uAccountName.value=user.Name+"/"+account.Name;
            uAccountName.textContent=account.Name+` (${account.Accountbalance})`;


            const firstAccountName=document.createElement("option");
            firstAccountName.value=user.Name+"/"+account.Name;
            firstAccountName.textContent=account.Name+` (${account.Accountbalance})`;
            
            const secondAccountName=document.createElement("option");
            secondAccountName.value=user.Name+"/"+account.Name;
            secondAccountName.textContent=account.Name+` (${account.Accountbalance})`;
            

            selectAccountName.appendChild(uAccountName);
            selectAccountName2.appendChild(uAccountName2);

            selectfirstAccount.appendChild(firstAccountName);
            selectsecondAccount.appendChild(secondAccountName);
        })
    })
   

    const accountList=document.getElementById("AccountList");
    accountList.innerHTML="";
    userList.forEach((user)=>{
        const tr=document.createElement("tr");
        const th=document.createElement("th");
        const thbtn=document.createElement("th");

        const deleteUserBtn=document.createElement("button");
        deleteUserBtn.textContent="Kullanıcıyı Sil";
        deleteUserBtn.className="btn btn-danger";

        deleteUserBtn.addEventListener("click",()=>{
            deleteUser(user.Name);
        })

        th.textContent=user.Name;
        th.colSpan=3;
        tr.appendChild(th);
        thbtn.appendChild(deleteUserBtn);
        tr.appendChild(thbtn);
        accountList.appendChild(tr);

        var number=0;
         var pl=[];

         pl=user.Accounts.sort((a, b) => (a.Name> b.Name) ? 1 : -1)
        
         pl.forEach((account)=>{
            number++;
            const rAccountName=document.createElement("option");
            rAccountName.value=user.Name+"/"+account.Name;
            rAccountName.textContent=user.Name+` (${user.Accountbalance})`;
            
            const AccountTr=document.createElement("tr");
            const NumberTd=document.createElement("td");
            NumberTd.textContent=number;
            
            const AccountNameTd=document.createElement("td");
            AccountNameTd.textContent=account.Name;


            const AccountbalanceTd=document.createElement("td");
            AccountbalanceTd.textContent=account.Accountbalance;

            const AccountDeleteTd=document.createElement("td");

            const deleteAccountBtn=document.createElement("button");
            deleteAccountBtn.textContent="Hesabı Sil";
            deleteAccountBtn.className="btn btn-warning";

            deleteAccountBtn.addEventListener("click",()=>{
                deleteAccount(user.Name,account);
            });

            AccountDeleteTd.appendChild(deleteAccountBtn);

            AccountTr.appendChild(NumberTd);
            AccountTr.appendChild(AccountNameTd);
            AccountTr.appendChild(AccountbalanceTd);
            AccountTr.appendChild(AccountDeleteTd);

            accountList.appendChild(AccountTr);
            
        })
    })
}



document.getElementById("addUser").addEventListener("click",(e)=>{
    e.preventDefault();
    addUser();
})
document.getElementById("addAccount").addEventListener("click",(e)=>{
    e.preventDefault();
    addAccount();
})


document.getElementById("uAccountName2").addEventListener("change", function() {
    var userInput=document.getElementById("uAccountName2").value;
    var uBalance=document.getElementById("takingAccount");
    var userSelect=[];
    userSelect=userInput.split("/");
   
    var user=userList.find((cf)=>cf.Name==userSelect[0]);
    var account=user.Accounts.find((pf)=>pf.Name==userSelect[1])
    uBalance.value="";
    uBalance.placeholder="Max: "+(account.Accountbalance);

    uBalance.max=account.Accountbalance;
})



document.getElementById("takeFromAccount").addEventListener("click", function(){
    
    var AccountInput=document.getElementById("uAccountName2").value;
    var uBalance=document.getElementById("takingAccount").value;
    var userSelect=[];
    userSelect=AccountInput.split("/");
   
    var user=userList.find((cf)=>cf.Name==userSelect[0]);
    var account=user.Accounts.find((pf)=>pf.Name==userSelect[1])
    
    if(Number(account.Accountbalance)>=Number(uBalance)){
        account.Accountbalance=Number(account.Accountbalance)-Number(uBalance);
        alert("Hesaba Para Çekme İşlemi Başarılı.."+ "\r\n" +Number(uBalance)+" TL miktarınca çekilmiştir");
    }
    else{
        alert("Hesapta Yeterli Bakiye Yok!!");
    }
    userNameUpdate();
})

document.getElementById("addToAccount").addEventListener("click", function(){
    
    var AccountInput=document.getElementById("rAccountName").value;
    var uBalance=document.getElementById("addingMoney").value;
    var userSelect=[];
    userSelect=AccountInput.split("/");
   
    var user=userList.find((cf)=>cf.Name==userSelect[0]);
    var account=user.Accounts.find((pf)=>pf.Name==userSelect[1])
    
    if(Number(uBalance)>=0){
        account.Accountbalance=Number(account.Accountbalance)+Number(uBalance);
        alert("Hesaba Para Yatırma İşlemi Başarılı.."+ "\r\n" +Number(uBalance)+" TL miktarınca eklenmiştir");
    }
    else{
        alert("Geçerli Tutar giriniz");
    }
    userNameUpdate();
})

document.getElementById("firstAccountName").addEventListener("change", function() {
    var userInput=document.getElementById("firstAccountName").value;
    var uBalance=document.getElementById("moneyToSend");
    var userSelect=[];
    userSelect=userInput.split("/");
   
    var user=userList.find((cf)=>cf.Name==userSelect[0]);
    var account=user.Accounts.find((pf)=>pf.Name==userSelect[1])
    uBalance.value="";
    uBalance.placeholder="Max: "+(account.Accountbalance);

    uBalance.max=account.Accountbalance;
})

document.getElementById("sendMoney").addEventListener("click", function(){
    
    var firstAccountName=document.getElementById("firstAccountName").value;
    var secondAccountName=document.getElementById("secondAccountName").value;
    var uBalance=document.getElementById("moneyToSend").value;
    

    var senderSelect=[];
    senderSelect=firstAccountName.split("/");
   
    var receiverSelect=[];
    receiverSelect=secondAccountName.split("/");

    var sender=userList.find((cf)=>cf.Name==senderSelect[0]);
    var senderaccount=sender.Accounts.find((pf)=>pf.Name==senderSelect[1])

    var receiver=userList.find((cf)=>cf.Name==receiverSelect[0]);
    var receiveraccount=receiver.Accounts.find((pf)=>pf.Name==receiverSelect[1])
    
    if(senderaccount.Name===receiveraccount.Name)
    {
        alert("Aynı hesaba para gönderilemez. Lütfen farklı bir hesap seçin");
        
    }

    else if(Number(senderaccount.Accountbalance)>=Number(uBalance)){
        receiveraccount.Accountbalance=Number(receiveraccount.Accountbalance)+Number(uBalance);

        senderaccount.Accountbalance=Number(senderaccount.Accountbalance)-Number(uBalance);
        alert(senderaccount.Name+" hesabından "+receiveraccount.Name+" hesabına "+Number(uBalance)+" TL havale gerçekleştirilmiştir.");
    }
    else{
        alert("Hesapta Yeterli Bakiye Yok!!");
    }
    userNameUpdate();
})