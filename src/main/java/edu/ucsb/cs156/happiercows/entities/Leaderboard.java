package edu.ucsb.cs156.happiercows.entities;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Builder;
import lombok.AccessLevel;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "leaderboard")
public class Leaderboard
{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long commonsid;

//   @ManyToOne
//   @JoinColumn(name = "user_commons_id")
//   private UserCommons userCommons;

  private String playerName;
  private double numOfCows;
  private double amtOfMoney;
  private double averageCowHealth;


//   private LocalDateTime startingDate;

//   @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
//   @JoinTable(name = "user_leaderboard",
//     joinColumns = @JoinColumn(name = "leaderboard_id", referencedColumnName = "id"),
//     inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
//   @JsonIgnore // https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion
//   private List<User> users;
}
