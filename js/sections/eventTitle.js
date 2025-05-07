
// Event Title Section
function initEventTitleSection() {
  const sectionHtml = `
    <img 
      src="/lovable-uploads/238a9ac4-eb4e-4505-a699-a85abc7f50c4.png" 
      alt="LIVE Score Logo"
      class="event-logo"
    />
    <img 
      src="/lovable-uploads/c80cf187-d9ab-4ccd-a210-ab2049d9a23a.png" 
      alt="KBO 올킬 이벤트"
      class="event-title"
    />
    <img 
      src="https://lh3.googleusercontent.com/fife/ALs6j_G3HVt9xvQYgZhBkRCbQiqz0ffG7vC2yH0MvcrIpLnFPVkuAOVR-WbEPFmQsgSqaNTf4AxIrOKzSWG9t4Nyx9KVtLxhRY2VY07G570I3CnIRA8NU8kBwTBmgtrb1l5Z4MWziA150T56YdCJBSMdogxTTdn3JgPmQSaRcm7LqLyqRpw25JIJ5TWsUh-439sQZ86J8P4FPTYxGpP3S0POv7m89S7A6_gRZt3ItZqa-uuyt6o99mAv012Wep88W7xxyDC6CO42WgTXr1xKD_Hdo5YJWlEB4ZIiB08zoTJG7vgid0U2RYytHG1f4QRSwO_tFdu8f37tZR7dyftQnD40Ezhom-sx1wyoYGwuKyG46VZ5rQxifw57H7emLbJ-akMbwjYr2_gJ_zDUIlhqUFDwVFvWIAx7gfCOk6_Sq0gxg8USxEXDbd3vj0GoXRZryyfBxm_gMUmLHLmNd1JXAV6KoaysGHqGC9pm6Da5I41IiOPQsfMgDEewnPh6wvDXYXTqAGeQzOIbRWSd78R2ZRixlxspVZqKWVHzRajySe3FMm3shySayVMCJGN0BeuELWGzlSLycsKnREvGaMzQ8oMeVvA8AxHeYHXYlK81rNh7wpE0BslpYnyIfS2l6M3TBof4DynpG_InROra6Yo7ZrRbrBwLaQMsPzrzuilYIW_KmL-vtjaHTdS3I9SsOh5fDTsFv7rKfgcrM1UVx5r_yheDscYDh_gWqCs_81UaFPhoI8QGOTF3AShWO2c5L48rLG_qOTlIeZbyqVgqgM6BB8hqBNwhloI3a3UInLoxVF3jUvdqK4jYjRqDl1Zt9iGL01zxr499PVY8MPneRL1qLG7ivG6UbXlcRRi-37PtpZTGRbxWX_ycicB-NdBMPBhDVdY1z8nkAui8zj_GYTYDzYTeDYOrWPI_7clPbCheHwaaIpWBrQdd512JoORAi81tLs-xCYS_4MqHluMK3SJfINWFbvsHEZUVHw1gPiYTPqSx4iGZvvTlkKH4hX8wHW65N32IL0bHl6zc3WkabYGBhCp1xu5SExOb3KxAL1pK9auUHZoDGzbS7fUqYZHTWV24TS7aS8p7q41Msfyf4bVMSzndSqhHKn3MSHnLMxVUqSSn2nWwRO0OPgjxeAWeCf1XdB6OXbcTQwZERH0KwEBxRCKDIOJ7XdTapp5_d518oIooW2dhEcVPhIKoRJSC83Er05UCyZuzoMqV1Mh612NhDzbBWjvsHnmKC1rfGx5qlAP61JkPyJPSWeu-EFvnHuMJt7wn2bbWGVV899W9sNXjbRap8opDiCTtqMzO-XrIMEAtz5gfTIRb7DbI-SnTf0hf5dumDuUW6eJ-Eh-zyyw_O1AZCleVeL3hXpPSDNn1nrGsKTbDTOT7LaCmmQg0pA67KoVHPnga9xDudjqeUyHGIKkwtjLh0tuk-9Brm40t4_JSR554LFRrAkMbk1F-gxnZjsfTaPipNWwKnTNtA_lbgcUJKMSeRGum3OvoIW52BfFQpKyiAa5ctzyUBF5XcL47jbOs6NjmpveW6h2boO2GqvrhKaGJhT41NRRN-vT7dMEx8cGI7Wjdjvng0FgP30X4GyvOADueRVgBRhggnbgONzQHOUS_=w1920-h911?auditContext=prefetch"
      alt="Event Emoticon"
      class="event-emoticon"
    />
  `;
  
  $('#event-title-section').html(sectionHtml);
  
  // Start animation
  window.animationUtils.startAnimation(document.getElementById('event-title-section'));
}

// Export the initialization function
window.eventTitleSection = {
  init: initEventTitleSection
};
