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
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void get_leaderboard() throws Exception {
   
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
  
    Leaderboard l1 = Leaderboard.builder().commonsid(2).playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();

    expectedLeaderboards.add(l1);
    
    
    when(leaderboardRepository.findAll()).thenReturn(expectedLeaderboards);
    MvcResult response = mockMvc.perform(get("/api/leaderboard/admin/all")).andDo(print()).andExpect(status().isOk()).andReturn();
    System.out.println(response);
    verify(leaderboardRepository, times(1)).findAll();

    String responseString = response.getResponse().getContentAsString();
    List<Leaderboard> actualLeaderboard = objectMapper.readValue(responseString, new TypeReference<List<Leaderboard>>() {});
    assertEquals(expectedLeaderboards, actualLeaderboard);
  }


  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void post_leaderboard_admin_post() throws Exception {
    Leaderboard expectedLeaderaboard = Leaderboard.builder().playerName("h").numOfCows(1).amtOfMoney(1).averageCowHealth(1).build();

    when(leaderboardRepository.save(expectedLeaderaboard)).thenReturn(expectedLeaderaboard);
    long num = 2;

    MvcResult response = mockMvc.perform(post("/api/leaderboard/admin/post?playerName=h&numOfCows=1&amtOfMoney=1&averageCowHealth=1").with(csrf())).andDo(print()).andExpect(status().isOk()).andReturn();

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
}

