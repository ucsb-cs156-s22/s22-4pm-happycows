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

  private String playerName;
  private double numOfCows;
  private double amtOfMoney;
  private double averageCowHealth;
}
