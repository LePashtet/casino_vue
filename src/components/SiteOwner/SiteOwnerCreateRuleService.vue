<template>
  <div class="form-desc">

    <div class="form-desc-title">{{ $t('siteowner.service3.title') }}</div>
    <div class="form-desc-text">How does it work?</div>

    <div class="form-desc-text">Here you can connect our API to a service/site of your choice.</div>
    <div class="form-desc-text">A good example would be a cryptocurrency game, a banner network or any other site that pays micropayments in cryptocurrencies to multiple users.</div>
    <div class="form-desc-text">To connect your site to our API and start using our hub as the payment gateway, follow these steps:</div>
    <div class="form-desc-text"><font-awesome-icon icon="circle"/>  Fill in the site's name (only visible to you), the site's URL.</div>
    <!--
    <div class="form-desc-text"><font-awesome-icon icon="circle"/>  The description of your service/site will be displayed in our Sites list faucet listing, make sure you are creative with it to attract more visitors.</div>
    -->
    <div class="form-desc-text"><font-awesome-icon icon="circle"/>  Click Create button and you will be given an API key which you can use to connect your site to Freebitme.</div>
    <div class="form-desc-text"><font-awesome-icon icon="circle"/>  Now you can go back to the Site owner tab and top up/withdraw funds, check the stats, edit or archive your service/site.</div>

    <div class="form-desc-text">Please, read carefully the instructions and guidelines on the right side of the page. Rule violations could result in your faucet refused service and/or removed from the faucet list.</div>


    <div class="form-desc-title">Rules and guidelines:</div>

    <div class="form-desc-text"><font-awesome-icon icon="circle"/> No malicious websites.</div>
    <div class="form-desc-text"><font-awesome-icon icon="circle"/> No malware, viruses, spyware or ransomware.</div>
    <div class="form-desc-text"><font-awesome-icon icon="circle"/> No unsolicited or automated downloads.</div>
    <div class="form-desc-text"><font-awesome-icon icon="circle"/> No browser locking scripts or other attempts to hijack the browser.</div>

    <div class="form-desc-text"><strong>Warning!</strong> We reserve the right to refuse service at our discretion. If we detect a malicious code or attempts to defraud the users, your account could be banned with any funds on it forfeit.</div>
  </div>
</template>

<script>
export default {
  name: 'SiteOwnerCreateRuleService'
}
</script>

<style scoped>

</style>
