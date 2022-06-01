package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.repositories.ProfitRepository;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.LeaderboardRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.entities.Profit;
import edu.ucsb.cs156.happiercows.entities.Leaderboard;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.Leaderboard;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.parameters.P;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.beans.factory.annotation.Autowired;
import edu.ucsb.cs156.happiercows.testconfig.TestConfig;

@WebMvcTest(controllers = LeaderboardController.class)
@Import(LeaderboardController.class)
public class LeaderboardControllerTests extends ControllerTestCase {
  @Autowired
  private ObjectMapper objectMapper;

  @MockBean
  LeaderboardRepository leaderboardRepository;

  @MockBean
  UserCommonsRepository userCommonsRepository;

  @MockBean
  UserRepository userRepository;

  @MockBean
  CommonsRepository commonsRepository;

//   @WithMockUser(roles = { "ADMIN" })
//   @Test
//   public void get_leaderboard_admin() throws Exception {

//     List<Leaderboard> testProfits = new ArrayList<Profit>();

//     UserCommons uc1 = UserCommons.builder().id(1).commonsId(2).userId(1).build();
//     UserCommons uc2 = UserCommons.builder().id(1).commonsId(2).userId(2).build();

//     Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(uc1).build();
//     Profit p2 = Profit.builder().id(43).profit(200).timestamp(12).userCommons(uc1).build();
//     Profit p3 = Profit.builder().id(44).profit(300).timestamp(12).userCommons(uc2).build();

//     testProfits.add(p1);
//     testProfits.add(p2);
//     testProfits.add(p3);
//     when(profitRepository.findAll()).thenReturn(testProfits);

//     MvcResult response = mockMvc.perform(get("/api/profits/admin/all")).andExpect(status().isOk()).andReturn();
    
//     verify(profitRepository, times(1)).findAll();
    
//     String responseString = response.getResponse().getContentAsString();
//     List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
//     assertEquals(actualProfits, testProfits);
//   }

//   @WithMockUser(roles = { "ADMIN" })
//   @Test
//   public void get_profits_admin2() throws Exception {
//     UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
//     Profit expectedProfit = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();
//     when(profitRepository.findById(42L)).thenReturn(Optional.of(expectedProfit));

//     MvcResult response = mockMvc.perform(get("/api/profits/admin?id=42")).andExpect(status().isOk()).andReturn();

//     verify(profitRepository, times(1)).findById(42L);

//     String responseString = response.getResponse().getContentAsString();
//     Profit actualProfit = objectMapper.readValue(responseString, Profit.class);
//     assertEquals(actualProfit, expectedProfit);
//   }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void get_leaderboard() throws Exception {
    // UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(get("/api/leaderboard?commonsid=2")).andExpect(status().isOk()).andReturn();
    verify(leaderboardRepository, times(1)).findById(num);

    String responseString = response.getResponse().getContentAsString();
    Leaderboard actualLeaderboard = objectMapper.readValue(responseString, Leaderboard.class);
    assertEquals(actualLeaderboard, expectedLeaderaboard);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_leaderboard_user() throws Exception {

    // UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(get("/api/leaderboard?commonsid=2")).andExpect(status().isOk()).andReturn();

    verify(leaderboardRepository, times(1)).findById(num);

    // Map<String, Object> json = responseToJson(response);
    // assertEquals("EntityNotFoundException", json.get("type"));
    // assertEquals("Leaderboard with id 2 not found", json.get("message"));
    String responseString = response.getResponse().getContentAsString();
    Leaderboard actualLeaderboard = objectMapper.readValue(responseString, Leaderboard.class);
    assertEquals(actualLeaderboard, expectedLeaderaboard);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void get_leaderboards_not_found() throws Exception {
    MvcResult response = mockMvc.perform(get("/api/leaderboard?commonsid=2")).andExpect(status().isNotFound()).andReturn();
    long num = 2;
    verify(leaderboardRepository, times(1)).findById(num);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Leaderboard with id 2 not found", json.get("message"));
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_leaderboard_admin_user() throws Exception {
    // UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(get("/api/leaderboard/admin?commonsid=2")).andExpect(status().isOk()).andReturn();

    verify(leaderboardRepository, times(1)).findById(num);

    String responseString = response.getResponse().getContentAsString();
    Leaderboard actualLeaderboard = objectMapper.readValue(responseString, Leaderboard.class);
    assertEquals(actualLeaderboard, expectedLeaderaboard);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_leaderboard_admin_not_found() throws Exception {
    MvcResult response = mockMvc.perform(get("/api/leaderboard/admin?commonsid=2")).andExpect(status().isNotFound()).andReturn();
    long num = 2;
    verify(leaderboardRepository, times(1)).findById(num);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Leaderboard with id 2 not found", json.get("message"));
  }

//   //DO we do this one
  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void get_leaderboard_all_commons() throws Exception {
    List<Leaderboard> expectedLeaderboards = new ArrayList<Leaderboard>();
    // UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Leaderboard l1 = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();

    expectedLeaderboards.add(l1);
    // when(leaderboardRepository.findAllByUserCommonsId(2)).thenReturn(expectedLeaderboards);
    // when(userCommonsRepository.findById(1L)).thenReturn(Optional.of(expectedUserCommons));
    // MvcResult response1 = mockMvc.perform(post("/api/leaderboard/admin/post?playerName=h&numOfCows=1&amtOfMoney=1&averageCowHealth=1").with(csrf())).andDo(print()).andExpect(status().isOk()).andReturn();
    when(leaderboardRepository.findAll()).thenReturn(expectedLeaderboards);
    MvcResult response = mockMvc.perform(get("/api/leaderboard/admin/all")).andDo(print()).andExpect(status().isOk()).andReturn();
    System.out.println(response);
    verify(leaderboardRepository, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<Leaderboard> actualLeaderboard = objectMapper.readValue(responseString, new TypeReference<List<Leaderboard>>() {});
    // assertEquals(expectedLeaderboards.toString(), responseString);
    assertEquals(expectedLeaderboards, actualLeaderboard);
  }

//   @WithMockUser(roles = { "USER" })
//   @Test
//   public void get_leaderboard_all_commons_nonexistent() throws Exception {
//     MvcResult response = mockMvc.perform(get("/api/leaderboard/all/commons?userCommonsId=1").contentType("application/json")).andExpect(status().isNotFound()).andReturn();
//     long num = 2;
//     verify(userCommonsRepository, times(1)).findById(num);

//     Map<String, Object> json = responseToJson(response);
//     assertEquals("EntityNotFoundException", json.get("type"));
//     assertEquals("UserCommons with id 1 not found", json.get("message"));
//   }

//   @WithMockUser(roles = { "ADMIN" })
//   @Test
//   public void get_leaderboard_admin_all_commons() throws Exception {
//     List<Profit> expectedProfits = new ArrayList<Profit>();
//     UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
//     Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

//     expectedProfits.add(p1);
//     when(profitRepository.findAllByUserCommonsId(1L)).thenReturn(expectedProfits);

//     MvcResult response = mockMvc.perform(get("/api/profits/admin/all/commons?userCommonsId=1").contentType("application/json")).andExpect(status().isOk()).andReturn();

//     verify(profitRepository, times(1)).findAllByUserCommonsId(1L);

//     String responseString = response.getResponse().getContentAsString();
//     List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
//     assertEquals(actualProfits, expectedProfits);
//   }

//   @WithMockUser(roles = { "ADMIN" })
//   @Test
//   public void get_profits_admin_all_commons_other_user() throws Exception {
//     List<Profit> expectedProfits = new ArrayList<Profit>();
//     UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(2).build();
//     Profit p1 = Profit.builder().id(42).profit(100).timestamp(12).userCommons(expectedUserCommons).build();

//     expectedProfits.add(p1);
//     when(profitRepository.findAllByUserCommonsId(1L)).thenReturn(expectedProfits);

//     MvcResult response = mockMvc.perform(get("/api/profits/admin/all/commons?userCommonsId=1")).andExpect(status().isOk()).andReturn();

//     verify(profitRepository, times(1)).findAllByUserCommonsId(1L);

//     String responseString = response.getResponse().getContentAsString();
//     List<Profit> actualProfits = objectMapper.readValue(responseString, new TypeReference<List<Profit>>() {});
//     assertEquals(actualProfits, expectedProfits);
//   }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void post_leaderboard_admin_post() throws Exception {
    // UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();

    when(leaderboardRepository.save(expectedLeaderaboard)).thenReturn(expectedLeaderaboard);
    long num = 2;
    // when(userCommonsRepository.findById(num)).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(post("/api/leaderboard/admin/post?playerName=h&numOfCows=1&amtOfMoney=1&averageCowHealth=1").with(csrf())).andDo(print()).andExpect(status().isOk()).andReturn();

    // verify(userCommonsRepository, times(1)).findById(num);
    verify(leaderboardRepository, times(1)).save(expectedLeaderaboard);

    String expectedJson = mapper.writeValueAsString(expectedLeaderaboard);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void delete_leaderboard_admin() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(delete("/api/leaderboard/admin?commonsid=2").with(csrf())).andExpect(status().isOk()).andReturn();
    verify(leaderboardRepository, times(1)).findById(num);
    verify(leaderboardRepository, times(1)).delete(expectedLeaderaboard);

    Map<String, Object> json = responseToJson(response);
    assertEquals("Leaderboard with id 2 deleted", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void delete_leaderboard_admin_other_user() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(delete("/api/leaderboard/admin?commonsid=2").with(csrf())).andExpect(status().isOk()).andReturn();

    verify(leaderboardRepository, times(1)).findById(num);
    verify(leaderboardRepository, times(1)).delete(expectedLeaderaboard);

    Map<String, Object> json = responseToJson(response);
    assertEquals("Leaderboard with id 2 deleted", json.get("message"));
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void put_leaderboard_admin() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(1).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();
    String requestBody = mapper.writeValueAsString(expectedLeaderaboard);
    String expectedReturn = mapper.writeValueAsString(expectedLeaderaboard);
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(put("/api/leaderboard/admin?commonsid=2").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody).with(csrf())).andExpect(status().isOk()).andReturn();

    verify(leaderboardRepository, times(1)).findById(num);
    verify(leaderboardRepository, times(1)).save(expectedLeaderaboard);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedReturn, responseString);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void put_leaderboard_admin_other_user() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();

    String requestBody = mapper.writeValueAsString(expectedLeaderaboard);
    String expectedReturn = mapper.writeValueAsString(expectedLeaderaboard);
    long num = 2;
    when(leaderboardRepository.findById(num)).thenReturn(Optional.of(expectedLeaderaboard));

    MvcResult response = mockMvc.perform(put("/api/leaderboard/admin?commonsid=2").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody).with(csrf())).andExpect(status().isOk()).andReturn();

    verify(leaderboardRepository, times(1)).findById(num);
    verify(leaderboardRepository, times(1)).save(expectedLeaderaboard);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedReturn, responseString);
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void put_leaderboard_admin_not_found() throws Exception {
    UserCommons expectedUserCommons = UserCommons.builder().id(1).commonsId(2).userId(100).build();
    Leaderboard expectedLeaderaboard = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();

    String requestBody = mapper.writeValueAsString(expectedLeaderaboard);

    MvcResult response = mockMvc.perform(put("/api/leaderboard/admin?commonsid=2").contentType(MediaType.APPLICATION_JSON).characterEncoding("utf-8").content(requestBody).with(csrf())).andExpect(status().isNotFound()).andReturn();
    long num = 2;
    verify(leaderboardRepository, times(1)).findById(num);
    verify(leaderboardRepository, times(0)).save(expectedLeaderaboard);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Leaderboard with id 2 not found", json.get("message"));
  }

  


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void delete_leaderboard_admin_not_found() throws Exception {
    MvcResult response = mockMvc.perform(delete("/api/leaderboard/admin?commonsid=2").with(csrf())).andExpect(status().isNotFound()).andReturn();
    long num = 2;
    verify(leaderboardRepository, times(1)).findById(num);

    Map<String, Object> json = responseToJson(response);
    assertEquals("EntityNotFoundException", json.get("type"));
    assertEquals("Leaderboard with id 2 not found", json.get("message"));
  }

//   @WithMockUser(roles = { "ADMIN" })
//   @Test
//   public void post_leaderboard_admin_post_not_found() throws Exception {
//     MvcResult response = mockMvc.perform(post("/api/leaderboard/admin/post?playerName=s&numOfCows=1&amtOfMoney=1&averageCowHealth=1").with(csrf())).andDo(print()).andExpect(status().isNotFound()).andReturn();
//     long num = 2;
//     verify(userCommonsRepository, times(1)).findById(num);

//     Map<String, Object> json = responseToJson(response);
//     assertEquals("EntityNotFoundException", json.get("type"));
//     assertEquals("UserCommons with id 1 not found", json.get("message"));
//   }
}

